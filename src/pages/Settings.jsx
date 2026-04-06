import React, { useRef } from 'react';
import { useWindowManager } from '../components/WindowManagerContext';
import { Monitor, Image as ImageIcon, Palette, Upload, Check, Zap } from 'lucide-react';

const Settings = () => {
    const { 
        wallpaper, setWallpaper, 
        wallpaperType, setWallpaperType, 
        customWallpaper, setCustomWallpaper 
    } = useWindowManager();
    
    const fileInputRef = useRef();

    const desktopWallpapers = [
        { id: 'bloom', name: 'Bloom', color: 'bg-blue-500' },
        { id: 'aurora', name: 'Aurora', color: 'bg-emerald-500' },
        { id: 'minimal', name: 'Midnight', color: 'bg-slate-900' },
    ];

    const solidColors = [
        '#000000', '#1e293b', '#334155', '#475569', 
        '#1e1b4b', '#312e81', '#1e3a8a', '#1e40af',
        '#064e3b', '#065f46', '#0f766e', '#115e59',
        '#7f1d1d', '#991b1b', '#450a0a', '#701a75'
    ];

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCustomWallpaper(event.target.result);
                setWallpaperType('custom');
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-12 max-w-5xl mx-auto p-4 md:p-10 h-full overflow-y-auto custom-scrollbar animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 border-b border-white/5 pb-10">
                <div className="w-24 h-24 rounded-[2.5rem] glass-win11 flex items-center justify-center text-accent shadow-2xl border border-white/10 ring-4 ring-white/5">
                    <Palette size={48} />
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-black tracking-tighter">Personalization</h2>
                    <p className="text-sm text-text-secondary font-bold uppercase tracking-[0.3em] opacity-40 mt-1">Windows Core / System Theme</p>
                </div>
            </header>

            {/* Preview Section */}
            <section className="glass rounded-[2rem] p-8 border border-white/5 bg-white/5 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-50" />
                <h3 className="text-sm font-bold mb-6 flex items-center gap-2 opacity-80">
                   <Monitor size={16} /> Desktop Preview
                </h3>
                <div className="aspect-video w-full max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/5 relative">
                    {/* Simulated OS in preview */}
                    <div className="absolute inset-0 bg-black">
                        {wallpaperType === 'custom' && customWallpaper && <img src={customWallpaper} className="w-full h-full object-cover" />}
                        {wallpaperType === 'color' && <div className="w-full h-full" style={{ backgroundColor: wallpaper }} />}
                        {wallpaperType === 'id' && (
                             <div className={`w-full h-full ${
                                wallpaper === 'bloom' ? 'bg-blue-600' : 
                                wallpaper === 'aurora' ? 'bg-emerald-800' : 'bg-slate-900'
                             }`} />
                        )}
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-4 rounded-full glass border border-white/10" />
                    <div className="absolute left-2 top-2 p-1 glass rounded-md">
                         <div className="w-4 h-4 rounded-[1px] border border-white/20" />
                    </div>
                </div>
            </section>

            {/* Type Selector */}
            <section className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-accent pl-2">Background Source</h4>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { id: 'id', label: 'Wallpapers', icon: ImageIcon },
                        { id: 'color', label: 'Solid Color', icon: Palette },
                        { id: 'custom', label: 'Custom Image', icon: Upload }
                    ].map(type => (
                        <button
                            key={type.id}
                            onClick={() => setWallpaperType(type.id)}
                            className={`p-4 rounded-3xl border transition-all flex flex-col items-center gap-3 ${
                                wallpaperType === type.id 
                                ? 'bg-accent/10 border-accent/40 text-accent ring-2 ring-accent/10' 
                                : 'glass border-white/5 hover:border-white/20 opacity-60 hover:opacity-100'
                            }`}
                        >
                            <type.icon size={20} />
                            <span className="text-[10px] font-black uppercase tracking-tight">{type.label}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Dynamic Controls based on Type */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {wallpaperType === 'id' && (
                    <div className="grid grid-cols-3 gap-4">
                        {desktopWallpapers.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => { setWallpaper(opt.id); setWallpaperType('id'); }}
                                className={`p-1.5 rounded-2xl border transition-all ${
                                    wallpaper === opt.id && wallpaperType === 'id' 
                                    ? 'border-accent ring-1 ring-accent' 
                                    : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                            >
                                <div className={`aspect-video rounded-xl ${opt.color} shadow-lg`} />
                                <span className="block mt-2 text-[10px] font-bold uppercase">{opt.name}</span>
                            </button>
                        ))}
                    </div>
                )}

                {wallpaperType === 'color' && (
                    <div className="grid grid-cols-8 gap-3 glass p-6 rounded-[2rem] border-white/5">
                        {solidColors.map((color) => (
                            <button
                                key={color}
                                onClick={() => { setWallpaper(color); setWallpaperType('color'); }}
                                style={{ backgroundColor: color }}
                                className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 flex items-center justify-center ${
                                    wallpaper === color && wallpaperType === 'color' 
                                    ? 'border-white scale-125 shadow-xl' 
                                    : 'border-white/10'
                                }`}
                            >
                                {wallpaper === color && wallpaperType === 'color' && <Check size={14} className="text-white" />}
                            </button>
                        ))}
                    </div>
                )}

                {wallpaperType === 'custom' && (
                    <div className="glass p-10 rounded-[2rem] border-dashed border-2 border-white/10 flex flex-col items-center justify-center gap-6 group hover:border-accent/40 transition-colors">
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                        <div className="w-20 h-20 rounded-[2.5rem] bg-accent/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                            <Upload size={32} />
                        </div>
                        <div className="text-center">
                            <h5 className="font-bold">Drop an image here</h5>
                            <p className="text-xs text-text-secondary mt-1">PNG, JPG or WebP up to 10MB</p>
                        </div>
                        <button 
                            onClick={() => fileInputRef.current.click()}
                            className="bg-accent text-bg-primary px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] transition-all"
                        >
                            Browse Device
                        </button>
                    </div>
                )}
            </div>

            <footer className="pt-10 flex items-center justify-between">
                <div className="flex items-center gap-2 opacity-40">
                    <Zap size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Active Settings / Core</span>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline underline-offset-4">Get more wallpapers</button>
            </footer>
        </div>
    );
};

export default Settings;
