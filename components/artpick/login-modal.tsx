'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      name: email.split('@')[0] || '컬렉터',
      email: email || 'collector@artpick.kr',
    };
    onLoginSuccess(user);
    onClose();
  };

  const handleDemoLogin = () => {
    onLoginSuccess({
      name: '김컬렉터',
      email: 'demo@artpick.kr',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md overflow-hidden rounded-[28px] border-none bg-[#f7f6f2] p-0 shadow-2xl">
        <DialogTitle className="sr-only">ARTPICK 로그인</DialogTitle>
        <div className="bg-[#181816] p-8 text-center text-white">
          <span className="font-cinzel text-2xl font-bold tracking-[0.2em]">ARTPICK</span>
          <p className="mt-2 text-xs text-white/60">
            예술을 사랑하는 당신을 위한 아트 컬렉팅 플랫폼
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-4">
          <div>
            <label className="text-xs font-semibold text-black/70">이메일 계정</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@artpick.kr"
              className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-white px-3.5 text-xs outline-none focus:border-[#1a56db]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-black/70">비밀번호</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-white px-3.5 text-xs outline-none focus:border-[#1a56db]"
            />
          </div>

          <Button
            type="submit"
            className="mt-2 h-11 w-full rounded-full bg-[#1a56db] text-xs font-semibold text-white shadow-sm hover:bg-[#1545b3]"
          >
            로그인
          </Button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="h-11 w-full rounded-full border border-black/15 bg-white text-xs font-semibold text-[#181816] hover:bg-black/5"
          >
            체험용 간편 로그인 (1초)
          </button>

          <p className="text-center text-[11px] text-black/45">
            아직 계정이 없으신가요? <span className="font-semibold text-[#1a56db] cursor-pointer">회원가입</span>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
