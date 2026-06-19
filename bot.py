import sys
import telebot
from google import genai

# البيانات بتاعتك اللي اتأكدنا إنها شغالة
TELEGRAM_TOKEN = "8617999551:AAEp4WATPeDzq9KDbYXGiFqDIOJTs0wsJ0w"
GEMINI_API_KEY = "AQ.Ab8RN6LNyIzQvRupaEqj_EkMK7A0qe34SqbRrnmHRtnZ0BuVVg"

print("جاري تشغيل البوت والربط بالذكاء الاصطناعي...")

try:
    # إعداد البوت والذكاء الاصطناعي
    bot = telebot.TeleBot(TELEGRAM_TOKEN)
    client = genai.Client(api_key=GEMINI_API_KEY)
    print("تم الاتصال بنجاح!")
except Exception as e:
    print(f"حصلت مشكلة في الإعدادات: {e}")
    sys.exit(1)

# الرد على أمر /start
@bot.message_handler(commands=["start"])
def send_welcome(message):
    bot.reply_to(message, "أهلاً بك يا محمود! أنا بوت الذكاء الاصطناعي الخاص بك، شغال وجاهز لأي سؤال.")

# استقبال الرسائل والرد عليها بالـ AI
@bot.message_handler(func=lambda message: True)
def handle_message(message):
    try:
        # إرسال رسالة المستخدم لنموذج جيميناي
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=message.text,
        )
        # الرد على المستخدم في تليجرام بنتيجة الـ AI
        bot.reply_to(message, response.text)
    except Exception as e:
        print(f"خطأ أثناء معالجة الرسالة: {e}")
        bot.reply_to(message, "معلش حصلت مشكلة صغيرة وأنا بكلم الـ AI، جرب تاني كمان شوية.")

print("البوت شغال دلوقتي ومستني رسايل على تليجرام...")
bot.infinity_polling()
