import React from 'react';
import { BiMap } from 'react-icons/bi';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <section className="px-8 py-10 w-full md:p-16 bg-[#20c194] text-white">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 xl:grid-cols-4 font-medium">
        <div className="grid gap-2">
          <h3 className="text-white font-bold text-3xl">
            Pharma
            <span>Sellticos</span>
          </h3>
        </div>
        <div className="grid">
          <h3 className="text-xl font-semibold mb-3">Lojas</h3>
          <div className="grid gap-2">
            <div className="flex items-center">
              <BiMap className="text-2xl mr-2" />
              <div>
                <p>R. Felipe Schmidt, 162</p>
                <p>Centro - Florianópolis</p>
              </div>
            </div>
            <div className="flex items-center">
              <BiMap className="text-2xl mr-2 " />
              <div>
                <p>Av. Me. Benvenuta, 1168</p>
                <p>Santa Monica - Florianópolis</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Suporte</h3>
          <div className="grid gap-2">
            <Link to="/faq">FAQ</Link>
            <Link to="https://wa.me/5548984847948" target="blank">
              Contato
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Redes Sociais</h3>
          <div className="flex gap-2">
            <FaFacebookSquare className="text-5xl" />
            <FaInstagramSquare className="text-5xl" />
            <FaLinkedin className="text-5xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
