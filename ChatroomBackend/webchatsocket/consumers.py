import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

class ChatRoomConsumer(AsyncWebsocketConsumer):

    async def websocket_connect(self, event):

        await self.accept()

        content = {'message':'hello world'}

        await self.send(text_data=json.dumps({
            "type":"message",
            "data":"hello world"
        }))    

    async def websocket_receive(self, message):
        print(message)
        return await super().websocket_receive(message)
        
    
