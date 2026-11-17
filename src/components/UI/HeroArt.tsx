import React from 'react';

// Ilustrasi flat 2D orisinal: koper handcarry dengan stiker bendera Jepang & Indonesia,
// Fuji + gunung berapi di belakang, tas belanja, kardus, dan pesawat di rute putus-putus.
const HeroArt: React.FC<{ label: string }> = ({ label }) => (
  <svg className="hero-art" viewBox="20 40 560 490" role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
    {/* latar organik */}
    <path d="M70 300 C40 170 170 50 320 62 C480 74 575 175 552 318 C535 438 430 512 300 512 C160 512 95 425 70 300Z" fill="#cfe6f8" />
    <circle cx="448" cy="152" r="54" fill="#f7931e" />

    {/* awan */}
    <g className="art-cloud art-cloud-a" fill="#fff">
      <ellipse cx="120" cy="150" rx="44" ry="15" /><circle cx="106" cy="139" r="17" /><circle cx="137" cy="135" r="21" />
    </g>
    <g className="art-cloud art-cloud-b" fill="#fff" opacity="0.95">
      <ellipse cx="520" cy="262" rx="36" ry="12" /><circle cx="509" cy="254" r="13" /><circle cx="531" cy="250" r="16" />
    </g>

    {/* gunung */}
    <path d="M52 410 L156 246 Q176 218 196 246 L300 410Z" fill="#14418a" />
    <path d="M132 286 L156 246 Q176 218 196 246 L220 288 L203 277 L188 296 L176 277 L162 297 L148 278Z" fill="#fff" />
    <path d="M318 410 L402 292 Q420 272 438 292 L524 410Z" fill="#2a5fb0" />
    <path d="M392 306 L402 292 Q420 272 438 292 L448 306 Q420 296 392 306Z" fill="#0b2d63" />
    <circle cx="420" cy="262" r="9" fill="#fff" opacity="0.9" />
    <circle cx="434" cy="244" r="12" fill="#fff" opacity="0.75" />
    <circle cx="452" cy="224" r="15" fill="#fff" opacity="0.55" />

    {/* tanah */}
    <ellipse cx="300" cy="418" rx="250" ry="30" fill="#e8f4fd" />

    {/* rute & pesawat */}
    <path id="art-route" className="art-route" d="M40 238 C 170 70, 400 40, 566 150" fill="none" />
    <g className="art-plane">
      <g transform="scale(1.25)">
        <path d="M-6 -3 L-20 -20 L-10 -20 L12 -4Z" fill="#c3d6ea" />
        <path d="M-34 0 C-30 -9 20 -11 38 -2 C42 0 42 2 38 4 C20 11 -30 9 -34 0Z" fill="#fff" stroke="#0b2d63" strokeWidth="2" />
        <path d="M-30 -2 L-40 -17 L-31 -17 L-18 -4Z" fill="#f7931e" stroke="#0b2d63" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M-6 3 L-26 24 L-13 24 L16 4Z" fill="#dbe9f7" stroke="#0b2d63" strokeWidth="2" strokeLinejoin="round" />
        <path d="M30 -5 C35 -4 38 -2 38 0 L26 0Z" fill="#0b2d63" />
        <circle cx="14" cy="-2" r="1.8" fill="#0b2d63" /><circle cx="7" cy="-2.4" r="1.8" fill="#0b2d63" /><circle cx="0" cy="-2.6" r="1.8" fill="#0b2d63" />
        <path d="M-33 2 L36 3" stroke="#f7931e" strokeWidth="2.4" />
      </g>
      <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
        <mpath href="#art-route" />
      </animateMotion>
    </g>

    {/* tas belanja */}
    <g className="art-float art-float-a">
      <path d="M128 372 C128 344 168 344 168 372" fill="none" stroke="#f7931e" strokeWidth="5" strokeLinecap="round" />
      <rect x="108" y="368" width="80" height="104" rx="8" fill="#14418a" />
      <rect x="108" y="368" width="80" height="14" rx="6" fill="#0b2d63" />
      <circle cx="148" cy="418" r="19" fill="#fff" />
      <circle cx="148" cy="418" r="11" fill="#d9382a" />
    </g>

    {/* kardus */}
    <g>
      <rect x="418" y="404" width="96" height="68" rx="5" fill="#e3b06a" />
      <rect x="418" y="404" width="96" height="14" rx="4" fill="#c98c3e" />
      <rect x="456" y="404" width="20" height="68" fill="#f6dca8" />
      <rect x="426" y="440" width="22" height="8" rx="2" fill="#fff3d6" opacity="0.8" />
    </g>

    {/* koper */}
    <g className="art-float art-float-b">
      <rect x="252" y="262" width="96" height="16" rx="8" fill="#0b2d63" />
      <rect x="262" y="272" width="8" height="26" fill="#0b2d63" />
      <rect x="330" y="272" width="8" height="26" fill="#0b2d63" />
      <rect x="204" y="294" width="192" height="180" rx="24" fill="#f7931e" />
      {[238, 294, 350].map((x) => <rect key={x} x={x} y="310" width="14" height="148" rx="7" fill="#e07f0a" />)}
      <rect x="204" y="386" width="192" height="24" fill="#14418a" />
      <circle cx="300" cy="398" r="11" fill="#fff" /><circle cx="300" cy="398" r="5" fill="#f7931e" />
      <rect x="226" y="294" width="22" height="9" rx="3" fill="#0b2d63" />
      <rect x="352" y="294" width="22" height="9" rx="3" fill="#0b2d63" />
      <circle cx="238" cy="480" r="13" fill="#0b2d63" /><circle cx="238" cy="480" r="5" fill="#fff" />
      <circle cx="362" cy="480" r="13" fill="#0b2d63" /><circle cx="362" cy="480" r="5" fill="#fff" />
      {/* stiker: Jepang */}
      <g transform="rotate(-8 250 338)">
        <circle cx="250" cy="338" r="23" fill="#fff" stroke="#0b2d63" strokeWidth="2" />
        <circle cx="250" cy="338" r="11" fill="#d9382a" />
      </g>
      {/* stiker: Indonesia */}
      <g transform="rotate(7 350 336)">
        <rect x="326" y="320" width="48" height="32" rx="5" fill="#fff" stroke="#0b2d63" strokeWidth="2" />
        <path d="M326 325 a5 5 0 0 1 5 -5 h38 a5 5 0 0 1 5 5 v11 h-48Z" fill="#d9382a" />
      </g>
      {/* stiker: pesawat */}
      <g transform="rotate(-6 300 440)">
        <circle cx="300" cy="440" r="19" fill="#fff" stroke="#0b2d63" strokeWidth="2" />
        <path d="M290 441 L310 432 L305 448 L300 444 L296 449Z" fill="#14418a" />
      </g>
    </g>
    <ellipse cx="300" cy="494" rx="170" ry="10" fill="#0b2d63" opacity="0.14" />

    {/* percikan */}
    <g fill="#f7931e"><circle cx="86" cy="296" r="5" /><circle cx="540" cy="372" r="4" /><circle cx="470" cy="70" r="3.5" /></g>
    <g fill="#14418a"><circle cx="64" cy="210" r="3.5" /><circle cx="560" cy="226" r="4.5" /></g>
  </svg>
);

export default HeroArt;
