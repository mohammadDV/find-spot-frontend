import Image from "next/image";
import postSample from "@/assets/images/post-sample.jpg";

export default async function PostPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 mt-4 lg:mt-10">
            <h1 className="lg:text-[40px] font-bold text-title">
                همه‌چیز درباره استانبول، برای ایرانی‌های مقیم یا علاقه‌مند به این شهر پرهیاهو!
            </h1>
            <Image src={postSample} alt="" width={1188} height={411} className="w-full rounded-2xl object-cover my-2 lg:my-6" />
            <p className="text-xs lg:text-lg text-title">
                در این بخش از سایت، می‌تونید تازه‌ترین اخبار، گزارش‌ها و مقاله‌های مربوط به زندگی در استانبول رو دنبال کنید. از معرفی رستوران‌ها و کافه‌های محبوب گرفته تا نکات حقوقی اقامت، رویدادهای فرهنگی، بازارها، تجربه‌های مهاجرت و داستان‌های بیزینسی ایرانی‌ها در ترکیه – همه‌چیز اینجاست.
                می‌خوای بدونی کجا غذای ایرانی خوب پیدا میشه؟ یا دنبال یه آرایشگاه ایرانی مطمئنی؟ شاید هم دوست داری بدونی چطور برای اجازه اقامت اقدام کنی؟ جواب همه‌ این سؤال‌ها و بیشتر رو توی بلاگ ما پیدا می‌کنی.
                با ما همراه باش تا زندگی در استانبول برات ساده‌تر، لذت‌بخش‌تر و حرفه‌ای‌تر بشه.
            </p>
        </div>
    )
}