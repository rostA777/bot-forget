const { match } = require('assert')
const {gameOptions, againOptions} = require('./options')
const TelegramApi = require('node-telegram-bot-api')

const token = '6036111118:AAEO92sLawQRz7beia4AexiIa7FbS959C_g'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const StartGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Я загадав цифру');
            const RandomNumber = Math.floor(Math.random() * 4);
            chats[chatId] = RandomNumber;
            await bot.sendMessage(chatId, 'Відгадуй', gameOptions);

}

const start = () => {
    bot.on('message', async msg=> {
        const text = msg.text;
        const chatId = msg.chat.id;
        bot.setMyCommands([
        {command: '/start', description: 'Hi'},
        {command: '/info', description: 'UserInfo'},
        {command: '/game', description: 'Randomazer'},
        ])
    
        if (text === '/start') {
           await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/175/10e/17510e63-2d89-41ec-a18c-1e3351dd42b1/4.webp');
           return bot.sendMessage(chatId, 'Вітаємо вас в боті Незабувайка');
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, 'Ваш iD ' + msg.from.first_name);
        }
        if (text === '/game') {
            return StartGame(chatId);
        }
        return bot.sendMessage(chatId, 'Dont get');

    })
    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return StartGame(chatId)
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId,'Вітаю ' + chats[chatId], againOptions);
        } else{
            return bot.sendMessage(chatId,'Не вгадав, я загадав ' + chats[chatId], againOptions);      
        }    
    })

}
start()

