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

const navLinks = [
  { label: 'Решения', href: '#solutions' },
  { label: 'Как это работает', href: '#how' },
  { label: 'О нас', href: '#about' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Партнёры', href: '#partners' },
  { label: 'FAQ', href: '#faq' },
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
    icon: 'BadgeDollarSign',
    title: 'Субсидия от государства',
    tag: '0 ₽',
    text: 'Получаете деньги от государства, о которых большинство предпринимателей просто не знает.',
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
    text: 'Видите рынок изнутри: кто, как и на чём зарабатывает в вашей нише.',
    bullets: ['Финансовые показатели конкурентов', 'Ценовое и продуктовое позиционирование', 'Точки уязвимости и возможности роста'],
  },
  {
    icon: 'ShieldAlert',
    title: 'Адаптация к 115-ФЗ',
    tag: null,
    text: 'Ваши счета работают без угрозы блокировки — финансовые потоки выстроены так, чтобы не вызывать вопросов у банков.',
    bullets: ['Аудит текущих рисков блокировки', 'Реструктуризация платёжных потоков', 'Актуально для строительства и торговли'],
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
    text: 'Масштабируетесь без вложений в новые точки — бизнес упакован в готовую франшизу с первыми франчайзи на старте.',
    bullets: ['Упаковка бизнес-модели и стандартов', 'Юридическая защита бренда', 'Подбор и подключение франчайзи'],
  },
];

const stats = [
  { value: '60+', label: 'партнёров-финансистов' },
  { value: '24 ч', label: 'среднее время ответа' },
  { value: '1–3%', label: 'экономия по ставке' },
  { value: '0 ₽', label: 'стоимость консультации' },
];

const steps = [
  { n: '01', title: 'Расскажите о задаче', text: 'Один звонок или заявка — без сложных форм и лишних бумаг.' },
  { n: '02', title: 'Получаете анализ', text: 'Видите все доступные инструменты с цифрами и сравнением.' },
  { n: '03', title: 'Выбираете условия', text: '60+ партнёров конкурируют за вашу заявку. Вы выбираете — не торгуясь.' },
  { n: '04', title: 'Получаете финансирование', text: 'Деньги или имущество — в руках. Без скрытых комиссий.' },
];

const advantages = [
  { icon: 'Compass', title: 'Независимый выбор', text: 'Получаете объективный разбор — без давления продать один продукт. Выбираете то, что выгодно вам.' },
  { icon: 'TrendingDown', title: 'Ставка ниже рынка', text: 'Экономите 1–3% относительно банка. Каждый процент — это +5–10% к рентабельности бизнеса.' },
  { icon: 'Gavel', title: 'Аукцион за вашу заявку', text: 'За вашу заявку конкурируют 60+ компаний. Получаете лучшие условия без переговоров.' },
  { icon: 'AlertTriangle', title: 'Никаких сюрпризов', text: 'Знаете заранее: фиксированная ставка или плавающая. Платежи не вырастут при повышении ставки ЦБ.' },
  { icon: 'Crosshair', title: 'Максимальный шанс одобрения', text: 'Заявка попадает туда, где её одобрят. Знаем, кто одобряет ваш тип объекта.' },
  { icon: 'ShieldAlert', title: 'Счёт без блокировок', text: 'Лизинговые платежи — хозяйственные расходы. Правильная структура снижает риск по 115-ФЗ.' },
];

const faqs = [
  { q: 'Сколько стоит консультация?', a: 'Бесплатно. Оплата происходит только при успешном результате — за счёт партнёрских условий с банками и лизинговыми компаниями.' },
  { q: 'Как понять, что подойдёт — лизинг или кредит?', a: 'Зависит от задачи: лизинг выгоднее при покупке имущества, кредит — при потребности в оборотных средствах. Вы получаете сравнение с цифрами — и сами принимаете решение.' },
  { q: 'Есть ли налоговая выгода?', a: 'Да. Лизинговые платежи полностью относятся на расходы — налог на прибыль снижается сразу. Ускоренная амортизация до 3х: актив списывается за 1–3 года вместо 10–15.' },
  { q: 'Одобрят ли молодой компании?', a: 'В большинстве случаев — да. По лизингу залог — сам предмет, не ваши активы. Заявка попадает к тем, кто наиболее лоялен к молодому бизнесу.' },
  { q: 'Какие государственные субсидии доступны?', a: 'Гранты МСП до 25 млн ₽, льготные займы от 1–3%, программы Корпорации МСП и региональные фонды. Получаете список того, что реально доступно вашей компании.' },
  { q: 'Как быстро получу первый ответ?', a: 'Варианты с цифрами — в течение суток. Предварительное одобрение по лизингу и кредиту — от 1 до 3 рабочих дней.' },
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
    toast.success('Заявка принята. Свяжемся в течение суток.');
    setForm({ name: '', phone: '', task: '', comment: '' });
  };

  return (
    <div className="min-h-screen bg-white text-foreground">

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <a href="#hero" className="font-semibold text-[15px] tracking-tight text-foreground">
            ЦентрФинансов
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <Button asChild size="sm"
            className="bg-foreground text-background hover:bg-foreground/85 rounded-none text-sm h-9 px-5">
            <a href="#apply">Получить разбор</a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-end pb-20 pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="container mx-auto relative z-10 px-6">
          <div className="max-w-2xl">
            <p className="animate-fade-up label-tag text-white/50 mb-8">
              Центр финансирования бизнеса
            </p>
            <h1 className="animate-fade-up text-5xl md:text-7xl font-bold text-white mb-6"
              style={{ animationDelay: '0.1s' }}>
              Хотите масштабировать бизнес?
            </h1>
            <p className="animate-fade-up text-lg text-white/60 max-w-xl mb-10 leading-relaxed"
              style={{ animationDelay: '0.18s' }}>
              Финансирование дешевле банка, снижение налогов, анализ конкурентов
              и стратегия роста — в одном месте.
            </p>
            <div className="animate-fade-up flex flex-wrap gap-3" style={{ animationDelay: '0.25s' }}>
              <Button asChild size="lg"
                className="bg-white text-foreground hover:bg-white/90 rounded-none font-semibold h-12 px-8 text-sm">
                <a href="#apply">Получить бесплатный разбор</a>
              </Button>
              <Button asChild size="lg" variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-none h-12 px-8 text-sm">
                <a href="#solutions">Все решения →</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {stats.map((s) => (
            <div key={s.label} className="py-10 px-8">
              <div className="font-serif text-4xl md:text-5xl font-bold mb-2 tracking-tight">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="label-tag mb-3">Решения</p>
              <h2 className="text-4xl md:text-5xl font-bold">Решения для вашего роста</h2>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Один запрос — определяем, что даст максимальный результат для вашей задачи.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {solutions.map((s) => (
              <div key={s.title}
                className="group bg-white p-8 hover:bg-neutral-50 transition-colors flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <Icon name={s.icon} className="text-foreground" size={22} />
                  {s.tag && (
                    <span className="text-[10px] font-semibold tracking-widest uppercase border border-border px-2 py-1">
                      {s.tag}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{s.text}</p>
                <ul className="space-y-1.5 border-t border-border pt-4">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-foreground shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild
              className="bg-foreground text-background hover:bg-foreground/85 rounded-none h-12 px-10 text-sm">
              <a href="#apply">Узнать, что подойдёт мне</a>
            </Button>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="py-24 bg-neutral-50 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <p className="label-tag mb-3">Процесс</p>
            <h2 className="text-4xl md:text-5xl font-bold">Как это работает</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {steps.map((s, i) => (
              <div key={s.n} className="bg-neutral-50 p-8">
                <div className="font-serif text-6xl font-bold text-neutral-200 mb-6 leading-none select-none">
                  {s.n}
                </div>
                <h3 className="font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="label-tag mb-3">О нас</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Наша миссия —<br />ваша рентабельность
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Рентабельность бизнеса в США в 2–4 раза выше, чем в России. Во многом это достигается
                низкими ставками финансирования и доступностью денежных ресурсов.
              </p>
              <p>
                Ставку ЦБ не изменить. Но вы можете получить{' '}
                <span className="text-foreground font-medium">лучший инструмент финансирования</span>{' '}
                — на условиях, недоступных напрямую.
              </p>
              <p>
                Каждый сэкономленный процент по ставке — это +5–10% к рентабельности.
                При экономии 1–3% разница ощутима уже в первый год.
              </p>
            </div>
          </div>
          <div className="lg:pt-16 space-y-0 divide-y divide-border border-y border-border">
            {[
              { t: 'Независимый выбор', d: 'Объективный разбор без давления — только то, что выгодно вашему бизнесу.' },
              { t: 'Любой масштаб', d: 'Решения для ИП, малого бизнеса и крупных компаний по всей России.' },
              { t: 'Вся Россия', d: 'Партнёры и государственные программы доступны в любом регионе.' },
            ].map((c) => (
              <div key={c.t} className="py-6">
                <h4 className="font-semibold mb-1">{c.t}</h4>
                <p className="text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24 bg-neutral-50 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <p className="label-tag mb-3">Преимущества</p>
            <h2 className="text-4xl md:text-5xl font-bold">Почему выбирают нас</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {advantages.map((a) => (
              <div key={a.title} className="bg-neutral-50 p-8 hover:bg-white transition-colors">
                <Icon name={a.icon} size={20} className="mb-5 text-foreground" />
                <h3 className="font-semibold text-base mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECOND OPINION BANNER */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 justify-between border border-border p-10 md:p-14">
            <div>
              <p className="label-tag mb-3">Уже есть предложение?</p>
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-3">
                Пришлите график платежей — выбьем скидку
              </h3>
              <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
                Даже если расчёт по лизингу уже на руках — пришлите его, и вы получите дополнительную выгоду.
              </p>
            </div>
            <Button asChild
              className="shrink-0 bg-foreground text-background hover:bg-foreground/85 rounded-none h-12 px-8 text-sm">
              <a href="#apply">Прислать график →</a>
            </Button>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <p className="label-tag mb-3">Партнёры</p>
            <h2 className="text-4xl md:text-5xl font-bold">60+ финансовых партнёров</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border border border-border">
            {partners.map((p) => (
              <div key={p}
                className="bg-white py-8 px-4 flex items-center justify-center text-sm text-muted-foreground hover:text-foreground hover:bg-neutral-50 transition-colors font-medium text-center">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" className="py-24 bg-neutral-50 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-px bg-border border border-border">
            <div className="md:col-span-2 bg-foreground text-background p-10 flex flex-col justify-between">
              <div>
                <p className="label-tag text-white/40 mb-6">Заявка</p>
                <h3 className="font-serif text-3xl font-bold mb-4">Получить решение</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  Опишите задачу — получаете варианты финансирования с цифрами в течение суток.
                </p>
              </div>
              <ul className="space-y-3">
                {['Консультация бесплатна', 'Все варианты финансирования', 'Ответ за 24 часа'].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <Icon name="Check" size={14} className="text-white/40" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={submit} className="md:col-span-3 bg-white p-10 space-y-5">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">Имя</label>
                <Input required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Петров"
                  className="rounded-none border-border h-11 text-sm bg-white focus-visible:ring-0 focus-visible:border-foreground" />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">Телефон</label>
                <Input required type="tel" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+7 (___) ___-__-__"
                  className="rounded-none border-border h-11 text-sm bg-white focus-visible:ring-0 focus-visible:border-foreground" />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">Задача</label>
                <Input value={form.task}
                  onChange={(e) => setForm({ ...form, task: e.target.value })}
                  placeholder="Купить оборудование, кредит, субсидия..."
                  className="rounded-none border-border h-11 text-sm bg-white focus-visible:ring-0 focus-visible:border-foreground" />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">Детали</label>
                <Textarea value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="Сумма, сроки, отрасль..."
                  className="rounded-none border-border text-sm bg-white min-h-[90px] focus-visible:ring-0 focus-visible:border-foreground" />
              </div>
              <Button type="submit" size="lg"
                className="w-full bg-foreground text-background hover:bg-foreground/85 rounded-none h-12 text-sm font-semibold">
                Получить бесплатный разбор
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="mb-14">
            <p className="label-tag mb-3">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-bold">Частые вопросы</h2>
          </div>
          <Accordion type="single" collapsible className="divide-y divide-border border-y border-border">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-none">
                <AccordionTrigger className="text-left text-base font-semibold hover:text-muted-foreground hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacts" className="border-t border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <p className="font-semibold text-[15px] mb-3">ЦентрФинансов</p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Независимый центр финансирования бизнеса. Подбираем лучшее решение под вашу задачу.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Контакты</p>
              <a href="tel:+74950000000"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Phone" size={14} /> +7 (495) 000-00-00
              </a>
              <a href="mailto:info@centerfin.ru"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Mail" size={14} /> info@centerfin.ru
              </a>
              <p className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Icon name="MapPin" size={14} /> Москва, Пресненская наб., 12
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Навигация</p>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-3">
            <span>© 2026 ЦентрФинансов</span>
            <span>Консультация и подбор — бесплатно</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
