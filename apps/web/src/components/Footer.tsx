export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: ['About Us', 'Blog', 'Careers', 'Press'],
    Support: ['Help Center', 'Safety', 'Terms', 'Privacy'],
    Connect: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'],
  };

  return (
    <footer className="bg-navy text-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container-tight">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue to-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl text-white">Pronto</span>
            </div>
            <p className="text-sm">
              Making home services simple, transparent, and accessible for everyone.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-blue-100 hover:text-white transition-smooth text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-blue/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p>
              © {currentYear} Pronto Services. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-blue-100 hover:text-white transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-smooth">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
