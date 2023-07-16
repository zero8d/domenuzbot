"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const axios_1 = __importDefault(require("axios"));
const bot = new grammy_1.Bot('2031567939:AAFzjxeHa-9Rw93M5rgEZ835UPx8f5adxu0');
bot.hears(/^[\w]{1,50}(\.uz)?$/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const word = ctx.match[0].split('.uz')[0];
    let res;
    try {
        const formData = new FormData();
        console.log(word);
        formData.append('domain', word);
        res = yield axios_1.default.post('https://my.eskiz.uz/api/whois', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    catch (error) {
        ctx.reply('Could not fetch');
        return;
    }
    const data = res.data;
    console.log(data);
    if (data.status === 'error') {
        ctx.reply("Domain can't be registered");
        return;
    }
    if (data.status === 'success') {
        ctx.reply('Domain: ' + data.domain + ' is free');
        return;
    }
    if (data.status === 'busy') {
        ctx.reply('Domain: ' + data.domain + ' already registered');
        return;
    }
}));
bot.start();
console.log('Bot started');
// /.{2,}\.uz/
