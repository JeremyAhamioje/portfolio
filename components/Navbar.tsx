import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => scrollTo("home")}
          className="btn-hero text-xl md:text-2xl font-bold tracking-tight hover:text-orange-500 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Jeremy A.
        </motion.button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {["projects", "about", "contact"].map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors font-medium"
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn-hero md:hidden text-white/80 hover:text-white transition-colors"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`block h-0.5 bg-current transition-all ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span className={`block h-0.5 bg-current ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 bg-current transition-all ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
        >
          <div className="px-6 py-8 space-y-6">
            {["projects", "about", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="block w-full text-left text-lg uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
