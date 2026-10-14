// لینک سامانه نوبت‌دهی هر تخصص را داخل کوتیشن بگذارید.
// کلیدها باید دقیقاً با specialty در doctors.js یکی باشند (بدون فاصله اضافه).
// اگر لینک خالی باشد، از DEFAULT_BOOKING_URL استفاده می‌شود؛
// اگر آن هم خالی باشد، «به‌زودی» نمایش داده می‌شود.
export const DEFAULT_BOOKING_URL = "";

export const bookingLinks = {
  "فوق تخصص نوزادان":
    "https://firoozabadinobat.iums.ac.ir/tc/list?text=&select_degree_expertise=expertise|11|219",
  "تخصص کودکان": "",
  "فوق تخصص آسم و آلرژی":
    "https://firoozabadinobat.iums.ac.ir/tc/profile/a4be38af-8d6b-11f1-aecc-005056afae8c",
  "فوق تخصص مغز و اعصاب کودکان":
    "https://firoozabadinobat.iums.ac.ir/tc/list?text=&select_degree_expertise=expertise|11|228",
  "فوق تخصص گوارش کودکان":
    "https://firoozabadinobat.iums.ac.ir/tc/list?text=&select_degree_expertise=expertise|11|226",
  "فوق تخصص عفونی کودکان":
    "https://firoozabadinobat.iums.ac.ir/tc/list?text=&select_degree_expertise=expertise|11|220",
  "فوق تخصص ریه کودکان":
    "https://firoozabadinobat.iums.ac.ir/tc/list?text=&select_degree_expertise=expertise|11|218",
  "فوق تخصص غدد کودکان":
    "https://firoozabadinobat.iums.ac.ir/tc/list?text=&select_degree_expertise=expertise|11|223",
  "فوق تخصص قلب کودکان":
    "https://firoozabadinobat.iums.ac.ir/tc/list?text=&select_degree_expertise=expertise|11|224",
  "فوق تخصص کلیه کودکان":
    "https://firoozabadinobat.iums.ac.ir/tc/list?text=&select_degree_expertise=expertise|11|225",
};

export const getBookingUrl = (specialty) =>
  bookingLinks[specialty] || DEFAULT_BOOKING_URL;
