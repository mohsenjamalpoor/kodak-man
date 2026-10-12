// لینک سامانه نوبت‌دهی هر تخصص را داخل کوتیشن بگذارید.
// کلیدها باید دقیقاً با specialty در doctors.js یکی باشند (بدون فاصله اضافه).
// اگر لینک خالی باشد، از DEFAULT_BOOKING_URL استفاده می‌شود؛
// اگر آن هم خالی باشد، «به‌زودی» نمایش داده می‌شود.
export const DEFAULT_BOOKING_URL = "";

export const bookingLinks = {
  "تخصص کودکان": "",
  "فوق تخصص آسم و آلرژی": "",
  "فوق تخصص مغز و اعصاب کودکان": "",
  "فوق تخصص گوارش کودکان":
    "https://firoozabadinobat.iums.ac.ir/tc/list?text=&select_degree_expertise=expertise|11|226",
  "فوق تخصص عفونی کودکان":
    "https://firoozabadinobat.iums.ac.ir/tc/list?text=&select_degree_expertise=expertise|11|220",
  "فوق تخصص ریه کودکان":
    "https://firoozabadinobat.iums.ac.ir/tc/list?text=&select_degree_expertise=expertise|11|218",
  "فوق تخصص غدد کودکان": "",
  "فوق تخصص قلب کودکان":
    "https://firoozabadinobat.iums.ac.ir/tc/list?text=&select_degree_expertise=expertise|11|224",
  "فوق تخصص کلیه کودکان": "",
};

export const getBookingUrl = (specialty) =>
  bookingLinks[specialty] || DEFAULT_BOOKING_URL;
