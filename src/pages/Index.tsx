import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';

const HERO_BG =
  'https://cdn.poehali.dev/projects/e741c96d-fd24-4581-91c1-7b809c60569b/files/eb1e1501-254b-4f03-9f4a-f0007efcc487.jpg';

const CROWN =
  'https://cdn.poehali.dev/projects/e741c96d-fd24-4581-91c1-7b809c60569b/files/1ff3465d-be4c-444c-9374-7e69c2f8d08b.jpg';

const navLinks = [
  { label: 'Решения', href: '#solutions' },
  { label: 'Как мы работаем', href: '#how' },
  { label: 'О нас', href: '#about' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Партнёры', href: '#partners' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
];

const problems = [
  { icon: 'TrendingUp', text: 'Хотите расти быстрее конкурентов?' },
  { icon: 'Store', text: 'Планируете запустить франшизу?' },
  { icon: 'Building2', text: 'Нужны средства на расширение производства?' },
  { icon: 'Receipt', text: 'Хотите снизить налоговую нагрузку законно?' },
];

const solutions = [
  {
    icon: 'Landmark',
    title: 'Лизинг',
    tag: 'Популярно',
    text: 'Получаете оборудование, транспорт или технику — без замораживания капитала. Ставка ниже банка на 1–3%, задаток от 20%, решение за сутки.',
    bullets: ['60+ компаний борются за вашу заявку', 'Ускоренная амортизация', 'Снижение налога на прибыль'],
  },
  {
    icon: 'Banknote',
    title: 'Бизнес-кредит',
    tag: null,
    text: 'Получаете лучшее предложение среди 20+ банков — без лишних визитов, лишних бумаг и потери времени.',
    bullets: ['Сравнение 20+ банков за вас', 'Без залога — до 10 млн ₽', 'Решение за 3 рабочих дня'],
  },
  {
    icon: 'Landmark',
    title: 'Субсидия от государства',
    tag: 'Бесплатно',
    text: 'Получаете деньги от государства, о которых большинство предпринимателей просто не знает. Подходящие программы — найдены, отбор — пройден.',
    bullets: ['Гранты МСП до 25 млн ₽', 'Льготные займы от 1–3%', 'Региональные программы'],
  },
  {
    icon: 'ShieldCheck',
    title: 'Банковская гарантия',
    tag: null,
    text: 'Получаете гарантию для тендера или контракта быстро — без переплаты и бюрократических задержек.',
    bullets: ['44-ФЗ и 223-ФЗ', 'Оформление за 1–2 дня', 'Лучший тариф на рынке'],
  },
  {
    icon: 'Receipt',
    title: 'Оптимизация налогов',
    tag: null,
    text: 'Платите меньше налогов законно — за счёт лизинга, ускоренной амортизации и правильной структуры расходов.',
    bullets: ['Ускоренная амортизация до 3х', 'Лизинг снижает налог на прибыль', 'Защита от 115-ФЗ'],
  },
  {
    icon: 'BarChart3',
    title: 'Анализ конкурентов',
    tag: null,
    text: 'Видите рынок изнутри: кто, как и на чём зарабатывает в вашей нише. Понимаете рынок — управляете им.',
    bullets: ['Финансовые показатели конкурентов', 'Ценовое и продуктовое позиционирование', 'Точки уязвимости и возможности роста'],
  },
  {
    icon: 'ShieldAlert',
    title: 'Адаптация бизнеса к 115-ФЗ',
    tag: null,
    text: 'Ваши счета работают без угрозы блокировки — финансовые потоки выстроены так, чтобы не вызывать вопросов у банков.',
    bullets: ['Аудит текущих рисков блокировки', 'Реструктуризация платёжных потоков', 'Особенно актуально для строительства и торговли'],
  },
  {
    icon: 'Rocket',
    title: 'Стратегия выхода из конкуренции',
    tag: 'Новое',
    text: 'Оказываетесь в нише, где вы — единственный выбор для клиента. Никакой ценовой войны, только рост маржи.',
    bullets: ['Нишевание и позиционирование', 'Уникальное торговое предложение', 'Дорожная карта на 6–18 месяцев'],
  },
  {
    icon: 'Store',
    title: 'Создание франшизы',
    tag: 'Новое',
    text: 'Масштабируетесь без вложений в новые точки — ваш бизнес упакован в готовую франшизу с первыми франчайзи на старте.',
    bullets: ['Упаковка бизнес-модели и стандартов', 'Юридическая защита бренда', 'Подбор и подключение франчайзи'],
  },
];

const stats = [
  { value: '60+', label: 'партнёров-финансистов' },
  { value: '24 ч', label: 'среднее время первого ответа' },
  { value: '1–3%', label: 'экономия по ставке относительно банка' },
  { value: '0 ₽', label: 'стоимость подбора и консультации' },
];

const steps = [
  { n: '01', title: 'Расскажите о задаче', text: 'Один звонок или заявка — без сложных форм и лишних бумаг.' },
  { n: '02', title: 'Получаете анализ вариантов', text: 'Видите все доступные инструменты: лизинг, кредит, субсидия или их комбинацию — с цифрами.' },
  { n: '03', title: 'Выбираете лучшее предложение', text: '60+ партнёров конкурируют за вашу заявку. Вы выбираете условия — не торгуясь.' },
  { n: '04', title: 'Получаете финансирование', text: 'Деньги или имущество — в руках. Без скрытых комиссий и неожиданностей.' },
];

const advantages = [
  { icon: 'Compass', title: 'Независимый выбор', text: 'Получаете объективный разбор — без давления продать один продукт. Выбираете то, что выгодно вам, а не нам.' },
  { icon: 'TrendingDown', title: 'Ставка ниже рынка', text: 'Экономите на ставке 1–3% относительно банка. Каждый сэкономленный процент — это +5–10% к рентабельности вашего бизнеса.' },
  { icon: 'Gavel', title: 'Аукцион за вашу заявку', text: 'За вашу заявку конкурируют 60+ компаний. Получаете лучшие условия — без переговоров и торга.' },
  { icon: 'AlertTriangle', title: 'Никаких сюрпризов', text: 'Знаете заранее: фиксированная ставка или плавающая. Ваши платежи не вырастут при повышении ставки ЦБ.' },
  { icon: 'Crosshair', title: 'Максимальный шанс одобрения', text: 'Ваша заявка попадает туда, где её одобрят. Каждая компания имеет негласный фокус — знаем, кто одобряет ваш тип объекта.' },
  { icon: 'ShieldAlert', title: 'Счёт работает без блокировок', text: 'Лизинговые платежи — хозяйственные расходы. Правильная структура трат снижает риск блокировки по 115-ФЗ.' },
];

const faqs = [
  { q: 'Сколько стоит консультация?', a: 'Подбор решения и консультация — бесплатно. Вы ничем не рискуете: оплата происходит только при успешном результате за счёт партнёрских условий с банками и лизинговыми компаниями.' },
  { q: 'Как понять, что мне подойдёт — лизинг или кредит?', a: 'Это зависит от задачи: лизинг выгоднее при покупке имущества (оборудование, транспорт, техника), кредит — при потребности в оборотных средствах. Вы получаете сравнение обоих вариантов с цифрами — и сами принимаете решение.' },
  { q: 'Есть ли налоговая выгода?', a: 'Да. Лизинговые платежи полностью относятся на расходы — налог на прибыль снижается сразу. Плюс ускоренная амортизация с коэффициентом до 3: актив списывается за 1–3 года вместо 10–15.' },
  { q: 'Одобрят ли финансирование молодой компании?', a: 'В большинстве случаев — да. По лизингу залог — сам предмет, не ваши активы. Заявка попадает к тем из 60+ партнёров, кто наиболее лоялен к молодому бизнесу — шанс одобрения максимален.' },
  { q: 'Какие государственные субсидии доступны?', a: 'Зависит от региона, отрасли и размера бизнеса. Доступны гранты МСП до 25 млн ₽, льготные займы от 1–3%, программы Корпорации МСП и региональные фонды. Вы получаете список того, что реально доступно именно вашей компании.' },
  { q: 'Как быстро получу первый ответ?', a: 'Варианты финансирования с цифрами — в течение суток. Предварительное одобрение по лизингу и кредиту — от 1 до 3 рабочих дней.' },
];

const partners = [
  'СберЛизинг', 'ВТБ Лизинг', 'Альфа-Лизинг', 'Газпромбанк', 'Совкомбанк',
  'РЕСО-Лизинг', 'Балтийский', 'Европлан', 'ВЭБ-лизинг', 'Интерлизинг',
  'Райффайзен', 'Контрол Лизинг',
];

const Index = () => {
  const [form, setForm] = useState({ name: '', phone: '', task: '', comment: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заявка принята! Свяжемся в течение суток с вариантами финансирования.');
    setForm({ name: '', phone: '', task: '', comment: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="container mx-auto flex items-center justify-between h-20 px-4">
          <a href="#hero" className="flex items-center gap-2.5">
            <img src={CROWN} alt="корона" className="w-9 h-9 object-contain" />
            <span className="font-display text-2xl font-bold tracking-tight">
              Центр<span className="gold-text-gradient">Финансов</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <Button asChild className="gold-gradient text-primary-foreground font-semibold hover:opacity-90">
            <a href="#apply">Получить решение</a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 hero-dark-overlay" />
        <div className="container mx-auto relative z-10 px-4 py-24">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-amber-400 tracking-[0.3em] uppercase text-xs mb-6">
              Центр финансирования бизнеса
            </p>
            <h1 className="animate-fade-up text-4xl md:text-6xl font-bold leading-[1.08] mb-6 text-white" style={{ animationDelay: '0.1s' }}>
              Хотите{' '}
              <span className="gold-text-gradient">масштабировать бизнес</span>{' '}
              и выйти на новый уровень?
            </h1>
            <p className="animate-fade-up text-lg text-white/70 max-w-2xl mb-8 leading-relaxed" style={{ animationDelay: '0.2s' }}>
              Получаете финансирование дешевле банка, снижаете налоги, понимаете конкурентов
              и выходите на рынок с позицией, где вы — единственный выбор.
            </p>

            {/* Problem cards */}
            <div className="animate-fade-up grid grid-cols-2 gap-3 max-w-xl mb-10" style={{ animationDelay: '0.25s' }}>
              {problems.map((p) => (
                <div key={p.text} className="flex items-start gap-3 bg-white/10 border border-white/20 rounded-sm px-4 py-3 backdrop-blur-sm">
                  <Icon name={p.icon} className="text-amber-400 shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-white/80 leading-snug">{p.text}</span>
                </div>
              ))}
            </div>

            <div className="animate-fade-up flex flex-wrap gap-4" style={{ animationDelay: '0.3s' }}>
              <Button asChild size="lg" className="gold-gradient text-white font-semibold text-base h-14 px-8 hover:opacity-90">
                <a href="#apply">
                  Получить бесплатный разбор
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base border-white/40 text-white hover:border-amber-400 hover:text-amber-400 bg-transparent">
                <a href="#solutions">Все решения</a>
              </Button>
            </div>
            <p className="animate-fade-up mt-5 text-sm text-white/50" style={{ animationDelay: '0.4s' }}>
              Консультация и подбор — бесплатно и ни к чему не обязывают
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-slate-50">
        <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/60">
          {stats.map((s) => (
            <div key={s.label} className="py-10 px-6 text-center">
              <div className="font-display text-4xl md:text-5xl font-bold gold-text-gradient mb-3">{s.value}</div>
              <div className="text-sm text-muted-foreground leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Решения</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Решения для вашего роста</h2>
            <p className="text-muted-foreground text-lg">Один запрос — и мы сами определим, что даст максимальный результат именно для вашей задачи.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((s) => (
              <div key={s.title} className="group relative p-8 rounded-sm bg-white border border-border hover:border-gold/60 hover:shadow-lg transition-all duration-300 flex flex-col">
                {s.tag && (
                  <span className="absolute top-6 right-6 text-xs font-semibold px-3 py-1 rounded-full gold-gradient text-primary-foreground">
                    {s.tag}
                  </span>
                )}
                <div className="w-13 h-13 w-14 h-14 rounded-sm gold-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shrink-0">
                  <Icon name={s.icon} className="text-primary-foreground" size={24} />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5 flex-1">{s.text}</p>
                <ul className="space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Check" className="text-gold shrink-0" size={14} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="gold-gradient text-primary-foreground font-semibold h-14 px-10 hover:opacity-90">
              <a href="#apply">
                Узнать, что подойдёт мне
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-28 bg-slate-50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Процесс</p>
            <h2 className="text-4xl md:text-5xl font-bold">Как мы работаем</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="relative p-8 rounded-sm bg-white border border-border shadow-sm">
                <div className="font-display text-6xl font-bold gold-text-gradient mb-4 leading-none">{s.n}</div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{s.text}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                    <Icon name="ChevronRight" className="text-gold" size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">О нас</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Наша миссия — ваша рентабельность
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
              <p>
                Средняя рентабельность бизнеса в США в 2–4 раза выше, чем в России. Во многом это достигается
                низкими ставками финансирования и доступностью денежных ресурсов.
              </p>
              <p>
                Ставку ЦБ не изменить. Но вы можете получить{' '}
                <span className="text-gold font-medium">лучший инструмент финансирования</span> на рынке —
                лизинг, кредит или государственную субсидию — на условиях, недоступных напрямую.
              </p>
              <p>
                Каждый сэкономленный процент по ставке — это +5–10% к рентабельности вашего бизнеса.
                При экономии 1–3% разница становится ощутимой уже в первый год.
              </p>
            </div>
          </div>
          <div className="grid gap-5">
            {[
              { icon: 'Compass', t: 'Независимый выбор', d: 'Получаете объективный разбор без давления — только то, что выгодно вашему бизнесу.' },
              { icon: 'Users', t: 'Любой масштаб', d: 'Доступны решения для ИП, малого бизнеса и крупных компаний по всей России.' },
              { icon: 'Globe', t: 'Вся Россия', d: 'Партнёры и государственные программы финансирования доступны в любом регионе.' },
            ].map((c) => (
              <div key={c.t} className="flex gap-5 p-6 rounded-sm bg-white border border-border shadow-sm">
                <div className="shrink-0 w-12 h-12 rounded-sm gold-border flex items-center justify-center">
                  <Icon name={c.icon} className="text-gold" size={22} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">{c.t}</h4>
                  <p className="text-muted-foreground">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-28 bg-slate-50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Преимущества</p>
            <h2 className="text-4xl md:text-5xl font-bold">Почему выбирают нас</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a) => (
              <div key={a.title} className="p-8 rounded-sm border border-border bg-white hover:border-gold/50 hover:shadow-md transition-all">
                <Icon name={a.icon} className="text-gold mb-5" size={32} />
                <h3 className="text-2xl font-semibold mb-3">{a.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECOND OPINION */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-sm gold-border bg-white shadow-lg p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
            <div className="shrink-0 w-20 h-20 rounded-sm gold-gradient flex items-center justify-center">
              <Icon name="FileSearch" className="text-primary-foreground" size={36} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">
                Уже есть график платежей?{' '}
                <span className="gold-text-gradient">Выбьем скидку</span>
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Даже если расчёт по лизингу уже на руках — пришлите его нам, и мы добьёмся для вас дополнительной выгоды.
              </p>
            </div>
            <Button asChild size="lg" className="shrink-0 gold-gradient text-primary-foreground font-semibold h-14 px-8 hover:opacity-90">
              <a href="#apply">
                Прислать график
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-28 bg-slate-50 border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Партнёры</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Более 60 финансовых партнёров</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-14 text-lg">
            Банки, лизинговые компании и государственные фонды — конкурируют за каждую вашу заявку.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border rounded-sm overflow-hidden shadow-sm">
            {partners.map((p) => (
              <div key={p} className="bg-white py-8 px-4 flex items-center justify-center text-muted-foreground hover:text-gold transition-colors font-display text-lg font-semibold">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY FORM */}
      <section id="apply" className="py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-sm border border-gold/30 bg-white shadow-xl overflow-hidden grid md:grid-cols-5">
            <div className="md:col-span-2 gold-gradient p-10 text-primary-foreground flex flex-col justify-center">
              <h3 className="font-display text-3xl font-bold mb-4">Получить решение</h3>
              <p className="opacity-90 leading-relaxed mb-8">
                Опишите задачу — мы подберём лучший инструмент финансирования и пришлём варианты в течение суток.
              </p>
              <ul className="space-y-3">
                {['Консультация бесплатна', 'Все варианты финансирования', 'Ответ за 24 часа'].map((i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Icon name="Check" size={18} />
                    <span className="font-medium">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={submit} className="md:col-span-3 p-10 space-y-5">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Ваше имя</label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Иван Петров" className="bg-slate-50 border-border h-12" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Телефон</label>
                <Input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" className="bg-slate-50 border-border h-12" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Что нужно бизнесу?</label>
                <Input value={form.task} onChange={(e) => setForm({ ...form, task: e.target.value })} placeholder="Купить оборудование, получить кредит, субсидия..." className="bg-slate-50 border-border h-12" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Детали</label>
                <Textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="Сумма, сроки, отрасль — любые подробности помогут подобрать лучшее решение" className="bg-slate-50 border-border min-h-[90px]" />
              </div>
              <Button type="submit" size="lg" className="w-full gold-gradient text-primary-foreground font-semibold h-14 hover:opacity-90">
                Получить бесплатный разбор
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 bg-slate-50 border-y border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-14">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-bold">Частые вопросы</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-sm px-6 bg-white shadow-sm">
                <AccordionTrigger className="text-left text-lg font-medium hover:text-gold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacts" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src={CROWN} alt="корона" className="w-8 h-8 object-contain" />
                <span className="font-display text-2xl font-bold">
                  Центр<span className="gold-text-gradient">Финансов</span>
                </span>
              </div>
              <p className="text-white/50 leading-relaxed">
                Независимый центр финансирования бизнеса. Подбираем лучшее решение под вашу задачу и ситуацию.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg mb-2">Контакты</h4>
              <a href="tel:+74950000000" className="flex items-center gap-3 text-white/60 hover:text-amber-400 transition-colors">
                <Icon name="Phone" size={18} /> +7 (495) 000-00-00
              </a>
              <a href="mailto:info@centerfin.ru" className="flex items-center gap-3 text-white/60 hover:text-amber-400 transition-colors">
                <Icon name="Mail" size={18} /> info@centerfin.ru
              </a>
              <p className="flex items-center gap-3 text-white/60">
                <Icon name="MapPin" size={18} /> Москва, Пресненская наб., 12
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Разделы</h4>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} className="text-white/60 hover:text-amber-400 transition-colors">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-sm text-white/40 flex flex-col md:flex-row justify-between gap-4">
            <span>© 2026 ЦентрФинансов. Все права защищены.</span>
            <span>Консультация и подбор — бесплатно и ни к чему не обязывают.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;