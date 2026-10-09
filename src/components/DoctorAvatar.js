import { FaUserDoctor } from "react-icons/fa6";

export default function DoctorAvatar({ doctor, className = "h-16 w-16 text-2xl" }) {
  if (doctor.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={doctor.image} alt={doctor.name} className={`${className} rounded-2xl object-cover`} />;
  }
  return (
    <span className={`${className} grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-teal-100 to-sky-100 text-teal-600`}>
      <FaUserDoctor />
    </span>
  );
}
