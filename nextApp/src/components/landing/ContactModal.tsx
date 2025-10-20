'use client';
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ContactForm from '@/components/forms/ContactForm';
import { Title as TitleT } from '@/lib/cms';

type ContactModalProps = {
    open: boolean;
    onClose: () => void;
    form: TitleT;
};

export default function ContactModal({ open, onClose, form }: ContactModalProps) {
    useEffect(() => {
        if (open) {
            const original = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = original;
            };
        }
        return undefined;
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.button
                        type="button"
                        aria-label="Закрыть форму"
                        className="fixed inset-0 z-40 bg-black/50"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        role="dialog"
                        aria-modal="true"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <ContactForm form={form} onSubmitted={onClose} className="md:max-w-[560px]" />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
