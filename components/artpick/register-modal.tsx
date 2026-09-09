'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Artwork } from '@/lib/artpick-data';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddArtwork: (artwork: Artwork) => void;
}

const PRESET_IMAGES = [
  { label: '추상 블루', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85' },
  { label: '감성 바다', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85' },
  { label: '화병 정물', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85' },
  { label: '미니멀 조각', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=85' },
];

export function RegisterModal({ isOpen, onClose, onAddArtwork }: RegisterModalProps) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [category, setCategory] = useState<'회화' | '사진' | '일러스트' | '조각'>('회화');
  const [price, setPrice] = useState('');
  const [dimensions, setDimensions] = useState('72.7 x 60.6 cm (20호)');
  const [medium, setMedium] = useState('Oil on canvas, 2026');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) {
      alert('작품명과 작가명을 입력해주세요.');
      return;
    }

    const numericPrice = parseInt(price.replace(/[^0-9]/g, ''), 10) || 1000000;
    const formattedPrice = `₩${numericPrice.toLocaleString('ko-KR')}`;

    const newArtwork: Artwork = {
      id: Date.now(),
      title,
      artist,
      artistHandle: `@${artist.replace(/\s+/g, '').toLowerCase()}`,
      artistId: 'registered_artist',
      category,
      price: numericPrice,
      formattedPrice,
      image: imageUrl,
      aspect: 'aspect-[4/3]',
      dimensions: dimensions || '변형 크기',
      medium: medium || 'Mixed media',
      year: new Date().getFullYear().toString(),
      likes: 1,
      description: description || '새롭게 등록된 신규 작가의 작품입니다.',
    };

    onAddArtwork(newArtwork);
    onClose();
    // Reset form
    setTitle('');
    setArtist('');
    setPrice('');
    setDescription('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl overflow-hidden rounded-[28px] border-none bg-[#f7f6f2] p-0 shadow-2xl">
        <div className="bg-[#181816] px-6 py-6 text-white sm:px-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#1a56db]">
            Artpick Studio
          </span>
          <DialogTitle className="font-serif-kr text-2xl font-bold mt-1 text-white">
            새로운 작품 등록하기
          </DialogTitle>
          <p className="mt-1 text-xs text-white/60">
            소중한 작품을 등록하고, 당신의 예술을 사랑하는 컬렉터와 연결되세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-black/70">작품명 *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 푸른 기억의 숲"
                className="mt-1.5 h-10 w-full rounded-xl border border-black/10 bg-white px-3.5 text-xs outline-none focus:border-[#1a56db]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-black/70">작가명 *</label>
              <input
                type="text"
                required
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="예: 김서영"
                className="mt-1.5 h-10 w-full rounded-xl border border-black/10 bg-white px-3.5 text-xs outline-none focus:border-[#1a56db]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-black/70">카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                className="mt-1.5 h-10 w-full rounded-xl border border-black/10 bg-white px-3.5 text-xs outline-none focus:border-[#1a56db]"
              >
                <option value="회화">회화</option>
                <option value="사진">사진</option>
                <option value="일러스트">일러스트</option>
                <option value="조각">조각</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-black/70">소장 가격 (₩)</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="예: 1,200,000"
                className="mt-1.5 h-10 w-full rounded-xl border border-black/10 bg-white px-3.5 text-xs outline-none focus:border-[#1a56db]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-black/70">작품 규격</label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="예: 90.9 x 72.7 cm (30호)"
                className="mt-1.5 h-10 w-full rounded-xl border border-black/10 bg-white px-3.5 text-xs outline-none focus:border-[#1a56db]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-black/70">재료 및 기법</label>
              <input
                type="text"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                placeholder="예: Oil on canvas, 2026"
                className="mt-1.5 h-10 w-full rounded-xl border border-black/10 bg-white px-3.5 text-xs outline-none focus:border-[#1a56db]"
              />
            </div>
          </div>

          {/* Image Selection */}
          <div>
            <label className="text-xs font-semibold text-black/70">대표 이미지 선택</label>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {PRESET_IMAGES.map((img) => (
                <button
                  type="button"
                  key={img.label}
                  onClick={() => setImageUrl(img.url)}
                  className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                    imageUrl === img.url ? 'border-[#1a56db] ring-2 ring-[#1a56db]/30' : 'border-transparent'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="h-full w-full object-cover" />
                  <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] text-white">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>

            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="또는 직접 이미지 URL을 입력하세요"
              className="mt-2.5 h-9 w-full rounded-xl border border-black/10 bg-white px-3 text-xs outline-none focus:border-[#1a56db]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-black/70">작품 설명 및 작가 노트</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="작품의 창작 배경, 영감, 담고 있는 메시지를 적어주세요."
              className="mt-1.5 w-full resize-none rounded-xl border border-black/10 bg-white p-3 text-xs outline-none focus:border-[#1a56db]"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-black/15 px-5 py-2.5 text-xs font-semibold text-black/60 hover:bg-black/5"
            >
              취소
            </button>
            <Button
              type="submit"
              className="rounded-full bg-[#1a56db] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#1545b3]"
            >
              작품 등록 완료
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
