// import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="bg-charcoal text-white py-16">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="grid lg:grid-cols-4 gap-12 mb-12">
//           {/* Company Info */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center space-x-3 mb-6">
//               <div className="w-12 h-12 bg-gradient-to-r from-royal-purple-500 to-deep-blue-500 rounded-xl flex items-center justify-center">
//                 <span className="text-white font-bold text-2xl">36x</span>
//               </div>
//               <span className="text-2xl font-bold font-helvetica">Finance</span>
//             </div>
//             <p className="text-gray-300 mb-6 leading-relaxed font-helvetica">
//               <strong>Raghav Kumar, Financial Services Curator</strong><br/>
//               Sector 9A, Bhadrugarh, Haryana | Serving Pan India<br/>
//               <span className="text-golden-400">+91-7987164248</span> | <span className="text-royal-purple-400">36xfinance@gmail.com</span><br/>
//               <span className="text-deep-blue-400">www.36xfinance.com</span>
//             </p>
//             <p className="text-lg font-semibold text-golden-400 mb-4 font-helvetica">
//               "No Cold Calls | No Spam | Just Value"
//             </p>
//             {/* Social Media */}
//             <div className="flex space-x-4">
//               <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
//                 <Linkedin className="text-white" size={20} />
//               </a>
//               <a href="#" className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors duration-300">
//                 <Instagram className="text-white" size={20} />
//               </a>
//               <a href="#" className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
//                 <Facebook className="text-white" size={20} />
//               </a>
//               <a href="#" className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors duration-300">
//                 <Youtube className="text-white" size={20} />
//               </a>
//             </div>
//           </div>

//           {/* Resources */}
//           <div>
//             <h4 className="text-xl font-bold mb-6 text-golden-400 font-helvetica">Resources</h4>
//             <ul className="space-y-3">
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Free Tools</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Knowledge Base</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Calculators</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Financial Guides</a></li>
//             </ul>
//           </div>

//           {/* Services */}
//           <div>
//             <h4 className="text-xl font-bold mb-6 text-royal-purple-400 font-helvetica">Services</h4>
//             <ul className="space-y-3">
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Tax Planning</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Insurance Advisory</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Investment Planning</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica">Retirement Planning</a></li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-600 pt-8">
//           <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left">
//             <p className="text-gray-400 mb-4 lg:mb-0 font-helvetica">
//               © 2024 36x Finance. All rights reserved. | Designed for clarity, built for trust.
//             </p>
//             <p className="text-gray-400 font-helvetica">
//               <a href="#" className="text-royal-purple-400 hover:text-deep-blue-400 transition-colors duration-300">@official_lavinsh_rathore</a> | 
//               <a href="#" className="text-golden-400 hover:text-yellow-400 transition-colors duration-300"> @raunak.jain</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
// import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Footer() {
//   return (
//     <footer className="bg-charcoal text-white py-16 relative overflow-hidden">
//       {/* background subtle gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-black/90 pointer-events-none" />

//       <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="grid lg:grid-cols-4 gap-12 mb-12">
//           {/* Company Info */}
//           <motion.div
//             className="lg:col-span-2"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             viewport={{ once: true }}
//           >
//             <div className="flex items-center space-x-3 mb-6">
//               <motion.div
//                 whileHover={{ scale: 1.05, rotate: 2 }}
//                 className="w-12 h-12 bg-gradient-to-r from-royal-purple-500 to-deep-blue-500 rounded-xl flex items-center justify-center shadow-lg"
//               >
//                 <span className="text-white font-bold text-2xl">36x</span>
//               </motion.div>
//               <span className="text-2xl font-bold font-helvetica tracking-wide">Finance</span>
//             </div>

//             <p className="text-gray-300 mb-6 leading-relaxed font-helvetica text-[15px]">
//               <strong className="text-white/90">Raghav Kumar, Financial Services Curator</strong>
//               <br />
//               Sector 9A, Bhadrugarh, Haryana | Serving Pan India
//               <br />
//               <span className="text-golden-400 font-medium">+91-7987164248</span> | {" "}
//               <span className="text-royal-purple-400">36xfinance@gmail.com</span>
//               <br />
//               <span className="text-deep-blue-400">www.36xfinance.com</span>
//             </p>

//             <p className="text-lg font-semibold text-golden-400 mb-4 font-helvetica italic">
//               "No Cold Calls | No Spam | Just Value"
//             </p>

//             {/* Social Media */}
//             <div className="flex space-x-4">
//               {[ 
//                 { icon: Linkedin, color: "bg-blue-600", hover: "hover:bg-blue-700" },
//                 { icon: Instagram, color: "bg-pink-600", hover: "hover:bg-pink-700" },
//                 { icon: Facebook, color: "bg-blue-500", hover: "hover:bg-blue-600" },
//                 { icon: Youtube, color: "bg-red-600", hover: "hover:bg-red-700" }
//               ].map((item, idx) => (
//                 <motion.a
//                   key={idx}
//                   href="#"
//                   whileHover={{ scale: 1.15, rotate: -5 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`w-10 h-10 ${item.color} ${item.hover} rounded-lg flex items-center justify-center shadow-md transition-colors duration-300`}
//                 >
//                   <item.icon className="text-white" size={20} />
//                 </motion.a>
//               ))}
//             </div>
//           </motion.div>

//           {/* Resources */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
//             viewport={{ once: true }}
//           >
//             <h4 className="text-xl font-bold mb-6 text-golden-400 font-helvetica relative after:block after:w-12 after:h-[2px] after:bg-golden-400 after:mt-2">
//               Resources
//             </h4>
//             <ul className="space-y-3">
//               {[
//                 { text: "Free Tools", link: "/resources#calculator" },
//                 { text: "Knowledge Base", link: "/about" },
//                 { text: "Calculators", link: "/resources/calculator" },
//                 { text: "Financial Guides", link: "/services#main-services" }
//               ].map((item, idx) => (
//                 <li key={idx}>
//                   <a
//                     href={item.link}
//                     className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica relative group"
//                   >
//                     {item.text}
//                     <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-golden-400 group-hover:w-full transition-all duration-300" />
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Services */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
//             viewport={{ once: true }}
//           >
//             <h4 className="text-xl font-bold mb-6 text-royal-purple-400 font-helvetica relative after:block after:w-12 after:h-[2px] after:bg-royal-purple-400 after:mt-2">
//               Services
//             </h4>
//             <ul className="space-y-3">
//               {["Tax Planning", "Insurance Advisory", "Investment Planning", "Retirement Planning"].map((text, idx) => (
//                 <li key={idx}>
//                   <a
//                     href="/services#main-services"
//                     className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica relative group"
//                   >
//                     {text}
//                     <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-royal-purple-400 group-hover:w-full transition-all duration-300" />
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         </div>

//         {/* Footer Bottom */}
//         <motion.div
//           className="border-t border-gray-700/60 pt-8"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.4, duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left">
//             <p className="text-gray-400 mb-4 lg:mb-0 font-helvetica text-sm tracking-wide">
//               © 2024 <span className="text-white/90">36x Finance</span>. All rights reserved. | Designed for clarity, built for trust.
//             </p>
//             <p className="text-gray-400 font-helvetica text-sm flex gap-2">
//               <a href="#" className="text-royal-purple-400 hover:text-deep-blue-400 transition-colors duration-300">@official_lavinsh_rathore</a>
//               <span>|</span>
//               <a href="#" className="text-golden-400 hover:text-yellow-400 transition-colors duration-300">@raunak.jain</a>
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </footer>
//   );
// }

import { Facebook, Instagram, Linkedin, Youtube, LogIn } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16 relative overflow-hidden">
      {/* background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-black/90 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="w-12 h-12 bg-gradient-to-r from-royal-purple-500 to-deep-blue-500 rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-2xl">36x</span>
              </motion.div>
              <span className="text-2xl font-bold font-helvetica tracking-wide">
                Finance
              </span>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed font-helvetica text-[15px]">
              <strong className="text-white/90">
                Raghav Kumar, Financial Services Curator
              </strong>
              <br />
              Sector 9A, Bhadrugarh, Haryana | Serving Pan India
              <br />
              <span className="text-golden-400 font-medium">
                +91-7987164248
              </span>{" "}
              | <span className="text-royal-purple-400">36xfinance@gmail.com</span>
              <br />
              <span className="text-deep-blue-400">www.36xfinance.com</span>
            </p>

            <p className="text-lg font-semibold text-golden-400 mb-4 font-helvetica italic">
              "No Cold Calls | No Spam | Just Value"
            </p>

            {/* Social Media + Admin */}
            <div className="flex space-x-4">
              {[
                {
                  icon: Linkedin,
                  color: "bg-blue-600",
                  hover: "hover:bg-blue-700",
                  link: "#",
                },
                {
                  icon: Instagram,
                  color: "bg-pink-600",
                  hover: "hover:bg-pink-700",
                  link: "#",
                },
                {
                  icon: Facebook,
                  color: "bg-blue-500",
                  hover: "hover:bg-blue-600",
                  link: "#",
                },
                {
                  icon: Youtube,
                  color: "bg-red-600",
                  hover: "hover:bg-red-700",
                  link: "#",
                },
                {
                  icon: LogIn,
                  color: "bg-gradient-to-r from-purple-600 to-blue-500",
                  hover: "hover:opacity-90",
                  link: "/login",
                },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.link}
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 ${item.color} ${item.hover} rounded-lg flex items-center justify-center shadow-md transition-colors duration-300`}
                >
                  <item.icon className="text-white" size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6 text-golden-400 font-helvetica relative after:block after:w-12 after:h-[2px] after:bg-golden-400 after:mt-2">
              Resources
            </h4>
            <ul className="space-y-3">
              {[
                { text: "Free Tools", link: "/resources#calculator" },
                { text: "Knowledge Base", link: "/about" },
                { text: "Calculators", link: "/resources/calculator" },
                { text: "Financial Guides", link: "/services#main-services" },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.link}
                    className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica relative group"
                  >
                    {item.text}
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-golden-400 group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6 text-royal-purple-400 font-helvetica relative after:block after:w-12 after:h-[2px] after:bg-royal-purple-400 after:mt-2">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Tax Planning",
                "Insurance Advisory",
                "Investment Planning",
                "Retirement Planning",
              ].map((text, idx) => (
                <li key={idx}>
                  <a
                    href="/services#main-services"
                    className="text-gray-300 hover:text-white transition-colors duration-300 font-helvetica relative group"
                  >
                    {text}
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-royal-purple-400 group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t border-gray-700/60 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left">
            <p className="text-gray-400 mb-4 lg:mb-0 font-helvetica text-sm tracking-wide">
              © 2024 <span className="text-white/90">36x Finance</span>. All rights
              reserved. | Designed for clarity, built for trust.
            </p>
            <p className="text-gray-400 font-helvetica text-sm flex gap-2">
              <a
                href="#"
                className="text-royal-purple-400 hover:text-deep-blue-400 transition-colors duration-300"
              >
                @official_lavinsh_rathore
              </a>
              <span>|</span>
              <a
                href="#"
                className="text-golden-400 hover:text-yellow-400 transition-colors duration-300"
              >
                @raunak.jain
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
