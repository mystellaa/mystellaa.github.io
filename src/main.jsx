import { useEffect, useRef, useState } from 'react'
import './styles.css'

const projects = [
  {
    id: '01',
    title: 'MELT / 失重实验室',
    type: 'AI VISUAL SYSTEM',
    year: '2025',
    accent: 'lime',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/cd8e35193601473.65eee9239970d.jpg',
    note: '把品牌变成一场持续融化的梦。',
  },
  {
    id: '02',
    title: 'VOID / 反重力展览',
    type: 'IDENTITY + MOTION',
    year: '2024',
    accent: 'pink',
    image: 'https://cdn.dribbble.com/userupload/46100497/file/69ca0fc377c797a8f48da278167a6a8d.png',
    note: '一套为未知情绪设计的展览视觉。',
  },
  {
    id: '03',
    title: 'SYNTH / 合成日常',
    type: 'ART DIRECTION',
    year: '2024',
    accent: 'blue',
    image: 'https://canada1.discourse-cdn.com/flex035/uploads/threejs/original/3X/5/3/53adc5b27a5747d51bb9d96a3cee87551bca841e.jpeg',
    note: '让数字角色进入真实生活的边缘。',
  },
]

const skills = [
  ['01', '视觉系统', '从定位到一套能长大的品牌语言。'],
  ['02', 'AI 共创', '把模型当作放大想象力的第二双手。'],
  ['03', '动态叙事', '让画面随着滚动、触碰和时间呼吸。'],
  ['04', '品牌设计', '识别、包装、空间与屏幕的一致体验。'],
]

function App() {
  const [active, setActive] = useState('HOME')
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [lightMode, setLightMode] = useState(false)
  const [hoveredProject, setHoveredProject] = useState(null)
  const projectRefs = useRef([])

  useEffect(() => {
    const onMove = (event) => setCursor({ x: event.clientX, y: event.clientY })
    window.addEventListener('pointermove', onMove)
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.dataset?.nav) setActive(visible.target.dataset.nav)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.5] },
    )
    document.querySelectorAll('[data-nav]').forEach((section) => sectionObserver.observe(section))
    return () => {
      window.removeEventListener('pointermove', onMove)
      sectionObserver.disconnect()
    }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const tiltProject = (event, index) => {
    const node = projectRefs.current[index]
    if (!node) return
    const rect = node.getBoundingClientRect()
    const rx = ((event.clientY - rect.top) / rect.height - 0.5) * -5
    const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 7
    node.style.setProperty('--rx', `${rx}deg`)
    node.style.setProperty('--ry', `${ry}deg`)
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    node.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  const resetProject = (index) => {
    const node = projectRefs.current[index]
    if (!node) return
    node.style.setProperty('--rx', '0deg')
    node.style.setProperty('--ry', '0deg')
  }

  return (
    <div className={`site ${lightMode ? 'light' : ''}`}>
      <div className="grain" aria-hidden="true" />
      <div className="cursor-dot" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} aria-hidden="true" />
      <header className="topbar">
        <button className="brand-lockup" onClick={() => scrollTo('home')} aria-label="回到首页">
          <span className="brand-mark">口口</span>
          <span className="brand-sub">VISUAL / AI / BRAND</span>
        </button>
        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          {['HOME', 'ABOUT', 'WORK', 'CONTACT'].map((item) => (
            <button key={item} className={active === item ? 'active' : ''} onClick={() => scrollTo(item.toLowerCase())}>
              {item}<sup>↗</sup>
            </button>
          ))}
        </nav>
        <div className="top-actions">
          <button className="mode-switch" onClick={() => setLightMode(!lightMode)} aria-label="切换色彩模式">
            <span className="mode-dot" /> {lightMode ? 'NIGHT' : 'NIGHT / ON'}
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!isMenuOpen)} aria-label="打开菜单"><span /> <span /></button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section" data-nav="HOME">
          <video className="hero-video" autoPlay muted loop playsInline poster="https://cdn.prod.website-files.com/687e8d1b96312cc631cafec7/68c4950d1202aaaa3645609e_60108278b0580141e8a43aef_6002086f72b72707ec01d6bd_chrissie-abbott-brutalist-portfolio.gif">
            <source src="https://cdn.pixabay.com/video/2020/05/24/40179-424468130_large.mp4" type="video/mp4" />
          </video>
          <div className="hero-scrim" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-kicker"><span className="live-dot" /> Shanghai / Anywhere <span>2025—∞</span></div>
            <div className="hero-title-wrap">
              <p className="eyebrow">VISUAL DESIGNER + AI DESIGNER</p>
              <h1><span>口口</span><em>口口</em></h1>
              <div className="hero-sticker">MAKE IT<br /><strong>STRANGE</strong></div>
            </div>
            <div className="hero-bottom">
              <p className="hero-intro">我用视觉、品牌和一点点不合时宜的想象，<br />为正在发生的事情制造新形状。</p>
              <button className="circle-cta" onClick={() => scrollTo('work')}><span>VIEW<br />WORK</span><b>↘</b></button>
              <div className="hero-index">SCROLL TO EXPLORE <span>↓</span></div>
            </div>
          </div>
          <div className="hero-corner corner-a">NO. 001 / OPEN STUDIO</div>
          <div className="hero-corner corner-b">© 2025 KOKO KOKO</div>
        </section>

        <div className="ticker" aria-label="个人标签滚动条"><div className="ticker-track">VISUAL IDENTITY <i>✳</i> AI IMAGINATION <i>✳</i> MOTION SYSTEMS <i>✳</i> BRAND WORLDS <i>✳</i> VISUAL IDENTITY <i>✳</i> AI IMAGINATION <i>✳</i></div></div>

        <section id="about" className="about section" data-nav="ABOUT">
          <div className="section-heading"><span>01 / ABOUT ME</span><span>THE HUMAN BEHIND THE SIGNAL</span></div>
          <div className="about-layout">
            <div className="portrait-wrap">
              <div className="portrait-frame">
                <div className="portrait-placeholder"><span>口</span><span>口</span><span>口</span></div>
                <div className="portrait-stamp">AGE<br /><strong>22</strong></div>
                <div className="portrait-caption">SELF PORTRAIT / 2025</div>
              </div>
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            </div>
            <div className="about-copy">
              <p className="mega-copy">把复杂的东西，<br /><span>做得有感觉。</span></p>
              <p className="body-copy">嗨，我是口口口口，一名在视觉、AI 与品牌之间来回穿梭的设计师。喜欢把清晰的策略揉进不太安分的图像里，也喜欢和认真有趣的人一起做还没有名字的东西。</p>
              <div className="about-facts">
                <div><small>ROLE</small><strong>Visual / AI / Brand Designer</strong></div>
                <div><small>BASED IN</small><strong>Shanghai, CN + Remote</strong></div>
                <div><small>OPEN FOR</small><strong>Collab / Freelance / Weird ideas</strong></div>
              </div>
              <a className="text-link" href="mailto:hello@koko-koko.studio">hello@koko-koko.studio <span>↗</span></a>
            </div>
          </div>
          <div className="stats-row">
            <div><strong>22</strong><span>YEARS ALIVE</span></div><div><strong>16</strong><span>PROJECTS IN LOOP</span></div><div><strong>04</strong><span>DISCIPLINES</span></div><div><strong>∞</strong><span>QUESTIONS LEFT</span></div>
          </div>
        </section>

        <section id="work" className="work section" data-nav="WORK">
          <div className="section-heading"><span>02 / SELECTED WORK</span><span>SCROLL, HOVER, GET CURIOUS</span></div>
          <div className="work-intro"><h2>Some things<br /><span>I made</span></h2><p>项目还在生长中。<br />先看看这几件正在发光的东西。</p></div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                key={project.id}
                ref={(node) => { projectRefs.current[index] = node }}
                className={`project-card ${project.accent} ${hoveredProject === index ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => { setHoveredProject(null); resetProject(index) }}
                onMouseMove={(event) => tiltProject(event, index)}
              >
                <div className="project-media"><img src={project.image} alt={project.title} /><div className="media-overlay" /><span className="project-number">{project.id}</span><span className="project-view">VIEW ↗</span></div>
                <div className="project-meta"><div><span className="project-type">{project.type}</span><h3>{project.title}</h3></div><div className="project-year">{project.year}<br /><span>↗</span></div></div>
                <p className="project-note">{project.note}</p>
              </article>
            ))}
          </div>
          <div className="work-footer"><span>03 MORE PROJECTS LOADING...</span><button onClick={() => alert('更多作品正在加载中，下一版见。')}>REQUEST ARCHIVE ↗</button></div>
        </section>

        <section className="skills section" data-nav="ABOUT">
          <div className="section-heading"><span>03 / WHAT I DO</span><span>USEFUL + A LITTLE UNEXPECTED</span></div>
          <div className="skills-heading"><h2>My favorite<br /><span>superpowers</span></h2><p>策略是骨架，视觉是皮肤，<br />交互让它开始呼吸。</p></div>
          <div className="skills-grid">
            {skills.map(([id, title, description]) => <div className="skill-card" key={id}><div className="skill-top"><span>{id}</span><span className="skill-arrow">↗</span></div><h3>{title}</h3><p>{description}</p><div className="skill-bar"><span /></div></div>)}
          </div>
        </section>

        <section id="contact" className="contact section" data-nav="CONTACT">
          <div className="contact-noise" />
          <div className="contact-inner"><div className="section-heading"><span>04 / SAY HELLO</span><span>GOOD THINGS START WITH A MESSAGE</span></div><p className="contact-kicker">有一个奇怪的想法？</p><h2>LET'S MAKE<br /><span>IT REAL.</span></h2><a className="contact-button" href="mailto:hello@koko-koko.studio"><span>hello@koko-koko.studio</span><b>↗</b></a><div className="contact-bottom"><span>口口口口 / VISUAL DESIGNER</span><div><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.behance.net/" target="_blank" rel="noreferrer">Behance ↗</a><a href="mailto:hello@koko-koko.studio">Email ↗</a></div><span>© 2025 — KEEP MAKING</span></div></div>
        </section>
      </main>
    </div>
  )
}

export default App
import { createRoot } from 'react-dom/client'
createRoot(document.getElementById('root')).render(<App />)
