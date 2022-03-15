from email import message
import json
from stringprep import in_table_d1
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from api.models import Message, Room
from api.serializers import MessageSerializer
from django.contrib.auth.models import User


class ChatRoomConsumer(AsyncWebsocketConsumer):

    async def websocket_connect(self, event):

        await self.accept()

        roomID = self.scope["url_route"]["kwargs"]["id"]
        serializedData = await self.getMessagesInRoom(roomID)

        await self.send(text_data=json.dumps({
            "type":"message",
            "data": serializedData
        }))    

    async def websocket_receive(self, message):
        messageDict =  json.loads(message["text"])
        roomID = self.scope["url_route"]["kwargs"]["id"]
        serializedData = await self.storeMessages(content=messageDict["message"], roomId=roomID, userId=messageDict["user_id"])


        await self.send(text_data=json.dumps({
             "type":"message",
             "data": serializedData
         })) 

        
    @database_sync_to_async
    def getMessagesInRoom(self, roomID):
        messages = Message.objects.filter(room=roomID).order_by('sent')
        serializer = MessageSerializer(messages, many=True)
       
        return serializer.data

    @database_sync_to_async
    def storeMessages(self, content, roomId, userId):
        user = User.objects.filter(id=int(userId))
        room = Room.objects.filter(id=roomId)
        Message.objects.create(content=content, sender=user[0], room=room[0])
        messages = Message.objects.filter(room=roomId).order_by('sent')
        serializer = MessageSerializer(messages, many=True)
       
        return serializer.data


    
    
   