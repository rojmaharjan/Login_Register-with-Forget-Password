import { Mail, Lock, User } from "lucide-react";

const FormInput = ({ icon, label, onChange, ...props }) => {
  const icons = {
    mail: <Mail className="w-5 h-5" />,
    lock: <Lock className="w-5 h-5" />,
    person: <User className="w-5 h-5" />,
  };

  return (
    <div className="input-wrapper relative w-full max-[768px]:h-[52px] mb-6 group">
      {/* Label for accessibility */}
      {label && <label className="block text-sm mb-2">{label}</label>}

      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3a91a5]">
        {icons[icon]}
      </div>

      <input
        {...props}
        onChange={onChange}   
        className="input-field h-[50px] max-[768px]:h-full w-[100%] outline-none text-base rounded border border-gray-300 px-12 transition-all duration-200 focus:border-[#3a91a5] placeholder:text-gray-400"
      />
    </div>
  ); 
};

export default FormInput;
