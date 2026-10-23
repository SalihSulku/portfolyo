'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import catPatternBg from './assets/cat_pattern_bg.jpg';
import { Navbar } from './components/Navbar';
import { MobileDrawer } from './components/MobileDrawer';
import { BottomMobileNav } from './components/BottomMobileNav';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { PrintableCVModal } from './components/PrintableCVModal';

import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { SkillsView } from './views/SkillsView';
import { ProjectsView } from './views/ProjectsView';
import { ContactView } from './views/ContactView';
import { GuestbookView, DefterVerisi } from './views/GuestbookView';

export default function App({ defter }: { defter: DefterVerisi }) {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Editorial sharp transition
  const pageVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' as const } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' as const } }
  };

  return (
    <div 
      className="min-h-screen text-stone-900 flex flex-col justify-between relative selection:bg-orange-600 selection:text-white"
      style={{
        backgroundColor: '#faf6f0',
        backgroundImage: `url(${catPatternBg.src})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '340px',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Light semi-transparent warm cream veil to keep text and cards perfectly readable */}
      <div className="fixed inset-0 bg-[#faf6f0]/85 pointer-events-none z-0" />

      {/* Main App Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <Navbar
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          onOpenContactModal={() => setIsContactModalOpen(true)}
          onOpenCVModal={() => setIsCVModalOpen(true)}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Mobile Drawer Overlay */}
        <MobileDrawer
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          onOpenContact={() => setIsContactModalOpen(true)}
          onOpenCV={() => setIsCVModalOpen(true)}
        />

        {/* Main Content with Animated Transitions */}
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 w-full pt-6 pb-20 md:pb-12">
          <AnimatePresence mode="wait">
            {currentTab === 'home' && (
              <motion.div
                key="home"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <HomeView
                  onNavigate={handleSelectTab}
                  onOpenContact={() => setIsContactModalOpen(true)}
                  onOpenCV={() => setIsCVModalOpen(true)}
                />
              </motion.div>
            )}

            {currentTab === 'about' && (
              <motion.div
                key="about"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <AboutView
                  onOpenContact={() => setIsContactModalOpen(true)}
                  onOpenCV={() => setIsCVModalOpen(true)}
                />
              </motion.div>
            )}

            {currentTab === 'skills' && (
              <motion.div
                key="skills"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <SkillsView
                  onNavigateProjects={() => handleSelectTab('projects')}
                />
              </motion.div>
            )}

            {currentTab === 'projects' && (
              <motion.div
                key="projects"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ProjectsView />
              </motion.div>
            )}

            {currentTab === 'guestbook' && (
              <motion.div
                key="guestbook"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <GuestbookView defter={defter} />
              </motion.div>
            )}

            {currentTab === 'contact' && (
              <motion.div
                key="contact"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ContactView
                  onOpenCV={() => setIsCVModalOpen(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Bottom Navigation Bar for Mobile */}
        <BottomMobileNav
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
        />

        {/* Footer */}
        <Footer
          onSelectTab={handleSelectTab}
          onOpenContact={() => setIsContactModalOpen(true)}
          onOpenCV={() => setIsCVModalOpen(true)}
        />

        {/* Contact Form Popup Modal */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />

        {/* Printable / Downloadable CV Modal */}
        <PrintableCVModal
          isOpen={isCVModalOpen}
          onClose={() => setIsCVModalOpen(false)}
        />
      </div>
    </div>
  );
}
