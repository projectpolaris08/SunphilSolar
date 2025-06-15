import React from "react";
import { Helmet } from "react-helmet";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import BeamsBackground from "@/components/BeamsBackground";

const AfterSalesPage: React.FC = () => {
  return (
    <BeamsBackground intensity="medium">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl py-20">
        <Helmet>
          <title>After Sales | SunPhil Solar</title>
        </Helmet>
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-white">
          After Sales Support
        </h1>
        <p className="mb-8 text-center text-white/80">
          For any after-sales support, warranty claims, or service requests,
          please contact us using the details below. Our team is ready to assist
          you with any concerns regarding your solar installation.
        </p>
        <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow p-4 sm:p-6 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">
            Contact Number
          </h2>
          <p className="mb-4 text-white font-bold flex flex-wrap items-center gap-2 break-all">
            <Phone className="inline-block text-blue-400" size={20} />
            <a
              href="tel:+639353658092"
              className="hover:underline hover:text-blue-400 text-white font-bold"
            >
              (+63) 935 365 8092
            </a>
            /
            <a
              href="tel:+639654474377"
              className="hover:underline hover:text-blue-400 text-white font-bold"
            >
              (+63) 965 447 4377
            </a>
          </p>
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">
            Email Address
          </h2>
          <p className="mb-4 text-white font-bold flex flex-wrap items-center gap-2 break-all">
            <Mail className="inline-block text-blue-400" size={20} />
            <a
              href="mailto:sunphilsolarpowerinstallation@gmail.com"
              className="hover:underline hover:text-blue-400 text-white font-bold"
            >
              sunphilsolarpowerinstallation@gmail.com
            </a>
          </p>
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">
            Facebook
          </h2>
          <p className="mb-4 flex flex-wrap items-center gap-2 text-white font-bold break-all">
            <Facebook className="inline-block text-blue-400" size={20} />
            <a
              href="https://www.facebook.com/fairview.solarista.2025"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-blue-400 text-white font-bold"
            >
              facebook.com/fairview.solarista.2025
            </a>
          </p>
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">
            Office Address
          </h2>
          <p className="mb-4 text-white font-bold flex flex-wrap items-center gap-2 break-words">
            <MapPin className="inline-block text-blue-400" size={20} />
            <a
              href="https://www.google.com/maps/place/Sunphil+Solar+Installation+Services/@14.7133426,121.0545683,17z/data=!3m1!4b1!4m6!3m5!1s0x3397b1a837ab86cd:0x12fa7ee4ac4b47b!8m2!3d14.7133374!4d121.0571432!16s%2Fg%2F11vwtgf832?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-blue-400 text-white font-bold"
            >
              28C North Fairview Phase 8 Subdivision, Blk 85 Yen, Quezon City,
              1121 Metro Manila
            </a>
          </p>
          <div className="w-full aspect-video rounded overflow-hidden mb-2">
            <iframe
              title="SunPhil Solar Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.986725399463!2d121.05456827587568!3d14.713342574304843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b1a837ab86cd%3A0x12fa7ee4ac4b47b!2sSunphil%20Solar%20Installation%20Services!5e0!3m2!1sen!2sph!4v1749208687301!5m2!1sen!2sph"
              className="w-full h-full min-h-[200px]"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="text-center text-white/60">
          <p>
            For urgent concerns, please call or email us directly. We are
            committed to providing fast and reliable after-sales service for all
            our clients.
          </p>
        </div>
      </div>
    </BeamsBackground>
  );
};

export default AfterSalesPage;
