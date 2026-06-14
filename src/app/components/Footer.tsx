'use client';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-xl mb-4 text-gameducation-navy">Gameducation</h3>
            <p className="text-gray-600 mb-4">
              Making education fun and engaging through interactive gaming experiences.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-gameducation-navy">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-gray-600 hover:text-gameducation-navy">Features</Link></li>
              <li><Link href="/templates" className="text-gray-600 hover:text-gameducation-navy">Templates</Link></li>
              <li><Link href="/pricing" className="text-gray-600 hover:text-gameducation-navy">Pricing</Link></li>
              <li><Link href="/roadmap" className="text-gray-600 hover:text-gameducation-navy">Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-gameducation-navy">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-600 hover:text-gameducation-navy">Blog</Link></li>
              <li><Link href="/tutorials" className="text-gray-600 hover:text-gameducation-navy">Tutorials</Link></li>
              <li><Link href="/case-studies" className="text-gray-600 hover:text-gameducation-navy">Case Studies</Link></li>
              <li><Link href="/support" className="text-gray-600 hover:text-gameducation-navy">Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-gameducation-navy">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-gameducation-navy">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-gameducation-navy">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gameducation-navy">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-gameducation-navy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Gameducation. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {/* Social icons */}
              <a href="#" className="text-gray-400 hover:text-gameducation-navy" aria-label="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523..." clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gameducation-navy" aria-label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547..." />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gameducation-navy" aria-label="Instagram">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c..." clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
