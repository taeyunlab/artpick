'use client';

import { useState } from 'react';
import { Search, Smartphone, Menu, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentTab: 'home' | 'artworks' | 'artists' | 'magazine';
  onNavigate: (tab: 'home' | 'artworks' | 'artists' | 'magazine') => void;
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onToggleDevicePreview: () => void;
  isDevicePreview: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  savedCount: number;
}

export function Header({
  currentTab,
  onNavigate,
  onOpenRegister,
  onOpenLogin,
  onToggleDevicePreview,
  isDevicePreview,
  searchQuery,
  onSearchChange,
  savedCount: _savedCount,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-[#f7f6f2]/92 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-10">
        {/* Left: Brand Logo & Slogan & Main Nav */}
        <div className="flex items-center gap-6 lg:gap-10">
          <button
            onClick={() => onNavigate('home')}
            className="group flex flex-col text-left focus:outline-none"
            aria-label="ARTPICK 홈으로 이동"
          >
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.14em] text-[#181816] transition-opacity group-hover:opacity-80">
                ARTPICK
              </span>
              <span className="rounded-md bg-[#2563eb] px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-white">
                BETA
              </span>
            </div>
            <span className="hidden sm:inline-block text-[10px] font-medium text-black/55 tracking-tight">
              신진 예술가의 발견 · 기록 · 연결 · 판매
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => onNavigate('artworks')}
              className={`text-sm font-medium transition-colors hover:text-[#181816] ${
                currentTab === 'artworks'
                  ? 'font-semibold text-[#181816]'
                  : 'text-[#181816]/65'
              }`}
            >
              작품 탐색
            </button>
            <button
              onClick={() => onNavigate('artists')}
              className={`text-sm font-medium transition-colors hover:text-[#181816] ${
                currentTab === 'artists'
                  ? 'font-semibold text-[#181816]'
                  : 'text-[#181816]/65'
              }`}
            >
              작가
            </button>
            <button
              onClick={() => onNavigate('magazine')}
              className={`text-sm font-medium transition-colors hover:text-[#181816] ${
                currentTab === 'magazine'
                  ? 'font-semibold text-[#181816]'
                  : 'text-[#181816]/65'
              }`}
            >
              매거진
            </button>
          </nav>
        </div>

        {/* Right: Search, Device Preview, Login, Register Artwork */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Quick Search */}
          <div className="relative hidden items-center lg:flex">
            <Search className="absolute left-3.5 size-4 text-black/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="작품, 작가 검색"
              className="h-9 w-44 rounded-full border border-black/10 bg-white/70 pl-9 pr-4 text-xs transition-all placeholder:text-black/40 focus:w-60 focus:border-black/30 focus:bg-white focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-xs text-black/40 hover:text-black"
              >
                ✕
              </button>
            )}
          </div>

          {/* Mobile Preview Mode Toggle */}
          <button
            onClick={onToggleDevicePreview}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              isDevicePreview
                ? 'bg-[#181816] text-white shadow-sm'
                : 'border border-black/15 bg-white/60 text-[#181816] hover:bg-white'
            }`}
            title="시안 속 모바일 2종(홈 피드 / 작가 프로필) 미리보기 토글"
          >
            <Smartphone className="size-3.5" />
            <span className="hidden sm:inline">
              {isDevicePreview ? '목업 뷰 닫기' : '모바일 뷰 보기'}
            </span>
          </button>

          {/* Artist Register CTA (Matches black pill button from mockup) */}
          <Button
            onClick={onOpenRegister}
            className="h-8 sm:h-9 rounded-full bg-[#181816] px-3.5 sm:px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-black/80"
          >
            작가 등록
          </Button>

          {/* Login Button */}
          <button
            onClick={onOpenLogin}
            className="hidden text-xs sm:text-sm font-medium text-[#181816]/75 transition hover:text-[#181816] md:inline-block"
          >
            로그인
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid size-9 place-items-center rounded-full border border-black/10 bg-white md:hidden"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-black/10 bg-[#f7f6f2] px-5 py-4 shadow-lg md:hidden">
          <div className="mb-4 flex items-center rounded-full border border-black/10 bg-white px-3 py-2">
            <Search className="size-4 text-black/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="작품, 작가, 키워드를 검색해보세요"
              className="ml-2 w-full text-xs outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium ${
                currentTab === 'home' ? 'bg-black/5 font-semibold text-[#181816]' : 'text-black/70'
              }`}
            >
              홈
            </button>
            <button
              onClick={() => {
                onNavigate('artworks');
                setMobileMenuOpen(false);
              }}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium ${
                currentTab === 'artworks' ? 'bg-black/5 font-semibold text-[#181816]' : 'text-black/70'
              }`}
            >
              작품 탐색
            </button>
            <button
              onClick={() => {
                onNavigate('artists');
                setMobileMenuOpen(false);
              }}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium ${
                currentTab === 'artists' ? 'bg-black/5 font-semibold text-[#181816]' : 'text-black/70'
              }`}
            >
              작가
            </button>
            <button
              onClick={() => {
                onNavigate('magazine');
                setMobileMenuOpen(false);
              }}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium ${
                currentTab === 'magazine' ? 'bg-black/5 font-semibold text-[#181816]' : 'text-black/70'
              }`}
            >
              매거진
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3">
            <button
              onClick={() => {
                onOpenLogin();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-medium text-black/70"
            >
              로그인 / 회원가입
            </button>
            <button
              onClick={() => {
                onToggleDevicePreview();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold text-[#1a56db]"
            >
              모바일 뷰 전환
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
