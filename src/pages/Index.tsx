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
  { label: 'Главная', href: '#hero' },
  { label: 'Услуги', href: '#services' },
  { label: 'О нас', href: '#about' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Партнёры', href: '#partners' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
];

const stats = [
  { value: '1–3%', label: 'выгода по ставке относительно банка' },
  { value: '60+', label: 'компаний борются за вашу заявку' },
  { value: 'от 20%', label: 'минимальный задаток' },
  { value: '24 часа', label: 'на решение по заявке' },
];

const services = [
  {
    icon: 'Truck',
    title: 'Лизинг транспорта',
    text: 'Легковой, грузовой и коммерческий транспорт на выгодных условиях.',
  },
  {
    icon: 'Factory',
    title: 'Лизинг оборудования',
    text: 'Производственные линии, станки и промышленное оборудование.',
  },
  {
    icon: 'Tractor',
    title: 'Спецтехника и агро',
    text: 'Сельхозтехника, строительная и дорожная спецтехника.',
  },
  {
    icon: 'Building2',
    title: 'Лизинг недвижимости',
    text: 'Коммерческие помещения, склады и офисные пространства.',
  },
];

const advantages = [
  {
    icon: 'TrendingDown',
    title: 'Ставка ниже банка',
    text: 'Каждый процент к ставке — это +5–10% к вашей рентабельности. Мы снижаем её на 1–3%.',
  },
  {
    icon: 'Gavel',
    title: 'Аукцион за вашу заявку',
    text: 'Более 60 лизинговых компаний конкурируют, улучшая условия именно для вас.',
  },
  {
    icon: 'Wallet',
    title: 'Задаток от 20%',
    text: 'Минимальный первоначальный взнос сохраняет ваши оборотные средства.',
  },
  {
    icon: 'Clock',
    title: 'Решение за сутки',
    text: 'Получите одобрение и лучшие предложения в течение 24 часов.',
  },
  {
    icon: 'Handshake',
    title: 'Партнёрская сеть',
    text: 'Прямые соглашения с лизингодателями дают доступ к закрытым условиям.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Сопровождение сделки',
    text: 'Ведём вас от заявки до подписания договора и передачи имущества.',
  },
  {
    icon: 'AlertTriangle',
    title: 'Никаких сюрпризов по ставке',
    text: 'Мы знаем, где плавающая ставка, а где фиксированная. Защитим вас от неожиданного роста платежей при повышении ставки ЦБ.',
  },
];

const faqs = [
  {
    q: 'Сколько стоят ваши услуги?',
    a: 'Подбор предложений бесплатен. Мы зарабатываем на партнёрских условиях с лизинговыми компаниями и заинтересованы дать вам минимальную ставку.',
  },
  {
    q: 'За счёт чего ставка ниже банковской?',
    a: 'Благодаря нашему партнёрству и конкуренции более 60 лизинговых компаний за каждую заявку. Они борются за клиента, улучшая условия на 1–3%.',
  },
  {
    q: 'Какой минимальный задаток?',
    a: 'Первоначальный взнос — от 20% стоимости предмета лизинга. Точные условия зависят от объекта и компании-лизингодателя.',
  },
  {
    q: 'Как быстро я получу решение?',
    a: 'Предварительное решение и подборку предложений вы получаете в течение суток после подачи заявки.',
  },
  {
    q: 'Что можно взять в лизинг?',
    a: 'Транспорт, спецтехнику, производственное оборудование, сельхозтехнику и коммерческую недвижимость.',
  },
];

const partners = [
  'СберЛизинг', 'ВТБ Лизинг', 'Альфа-Лизинг', 'Газпромбанк', 'Совкомбанк',
  'РЕСО-Лизинг', 'Балтийский', 'Европлан', 'ВЭБ-лизинг', 'Интерлизинг',
  'Райффайзен', 'Контрол Лизинг',
];

const Index = () => {
  const [form, setForm] = useState({ name: '', phone: '', amount: '', comment: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заявка отправлена! Свяжемся с вами в течение суток.');
    setForm({ name: '', phone: '', amount: '', comment: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="container mx-auto flex items-center justify-between h-20 px-4">
          <a href="#hero" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold tracking-tight">
              Лизинг<span className="gold-text-gradient">Про</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <Button asChild className="gold-gradient text-primary-foreground font-semibold hover:opacity-90">
            <a href="#apply">Оставить заявку</a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="container mx-auto relative z-10 px-4 py-24">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-gold tracking-[0.3em] uppercase text-xs mb-6">
              Финансирование для бизнеса
            </p>
            <h1
              className="animate-fade-up text-5xl md:text-7xl font-bold leading-[1.05] mb-8"
              style={{ animationDelay: '0.1s' }}
            >
              Лизинг со ставкой ниже{' '}
              <span className="gold-text-gradient">на 1–3%</span> от банка
            </h1>
            <p
              className="animate-fade-up text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
              style={{ animationDelay: '0.2s' }}
            >
              Более 60 компаний будут бороться за вашу заявку, улучшая условия для
              вас. Задаток от 20% стоимости. Решение в течение суток.
            </p>
            <div
              className="animate-fade-up flex flex-wrap gap-4"
              style={{ animationDelay: '0.3s' }}
            >
              <Button
                asChild
                size="lg"
                className="gold-gradient text-primary-foreground font-semibold text-base h-14 px-8 hover:opacity-90"
              >
                <a href="#apply">
                  Получить лучшие условия
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base border-border hover:border-gold hover:text-gold bg-transparent"
              >
                <a href="#services">Наши услуги</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/60">
          {stats.map((s) => (
            <div key={s.label} className="py-10 px-6 text-center">
              <div className="font-display text-4xl md:text-5xl font-bold gold-text-gradient mb-3">
                {s.value}
              </div>
              <div className="text-sm text-muted-foreground leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Услуги</p>
            <h2 className="text-4xl md:text-5xl font-bold">Что мы оформляем в лизинг</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="group p-8 rounded-sm bg-card border border-border/60 hover:border-gold/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-sm gold-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name={s.icon} className="text-primary-foreground" size={26} />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / MISSION */}
      <section id="about" className="py-28 bg-card/40 border-y border-border/60">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">О нас</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Наша миссия — ваша рентабельность
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
              <p>
                Средняя рентабельность бизнеса в США в 2–4 раза выше, чем в России, а
                по некоторым направлениям, например в сельском хозяйстве, выше в 30
                раз. Во многом это достигается низкими ставками финансирования и
                доступностью денежных ресурсов.
              </p>
              <p>
                Мы не можем повлиять на размер процентных ставок, но можем помочь вам
                получить{' '}
                <span className="text-gold font-medium">
                  самые выгодные условия лизинга
                </span>{' '}
                на территории России.
              </p>
              <p>
                Каждый процент к ставке — это обычно +5–10% к вашей рентабельности.
                Если с нами вы получите ставку ниже на 1–3%, то мы просто обязаны этим
                заниматься.
              </p>
            </div>
          </div>
          <div className="grid gap-5">
            {[
              { icon: 'Target', t: 'Фокус на выгоде', d: 'Снижаем вашу ставку на 1–3% за счёт партнёрской сети.' },
              { icon: 'Users', t: 'Опытная команда', d: 'Сопровождаем сделки бизнеса любого масштаба.' },
              { icon: 'Globe', t: 'Вся Россия', d: 'Работаем с компаниями по всей территории страны.' },
            ].map((c) => (
              <div key={c.t} className="flex gap-5 p-6 rounded-sm bg-background border border-border/60">
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
      <section id="advantages" className="py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Преимущества</p>
            <h2 className="text-4xl md:text-5xl font-bold">Почему выбирают нас</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a) => (
              <div
                key={a.title}
                className="p-8 rounded-sm border border-border/60 hover:bg-card transition-colors"
              >
                <Icon name={a.icon} className="text-gold mb-5" size={32} />
                <h3 className="text-2xl font-semibold mb-3">{a.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-28 bg-card/40 border-y border-border/60">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Партнёры</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Более 60 лизинговых компаний</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-14 text-lg">
            Они конкурируют за вашу заявку, улучшая условия именно для вас.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border/60 rounded-sm overflow-hidden">
            {partners.map((p) => (
              <div
                key={p}
                className="bg-background py-8 px-4 flex items-center justify-center text-muted-foreground hover:text-gold transition-colors font-display text-lg font-semibold"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECOND OPINION OFFER */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-sm gold-border bg-card p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
            <div className="shrink-0 w-20 h-20 rounded-sm gold-gradient flex items-center justify-center">
              <Icon name="FileSearch" className="text-primary-foreground" size={36} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">
                Уже есть график платежей? <span className="gold-text-gradient">Выбьем скидку</span>
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Даже если расчёт по лизингу уже на руках — пришлите его нам, и мы
                добьёмся для вас дополнительной выгоды.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="shrink-0 gold-gradient text-primary-foreground font-semibold h-14 px-8 hover:opacity-90"
            >
              <a href="#apply">
                Прислать график
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* APPLY FORM */}
      <section id="apply" className="py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-sm border border-gold/30 bg-card overflow-hidden grid md:grid-cols-5">
            <div className="md:col-span-2 gold-gradient p-10 text-primary-foreground flex flex-col justify-center">
              <h3 className="font-display text-3xl font-bold mb-4">Онлайн-заявка</h3>
              <p className="opacity-90 leading-relaxed mb-8">
                Заполните форму — и более 60 компаний начнут бороться за лучшие
                условия для вас. Решение в течение суток.
              </p>
              <ul className="space-y-3">
                {['Бесплатный подбор', 'Ставка ниже на 1–3%', 'Ответ за 24 часа'].map((i) => (
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
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Петров"
                  className="bg-background border-border h-12"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Телефон</label>
                <Input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+7 (___) ___-__-__"
                  className="bg-background border-border h-12"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Сумма лизинга, ₽
                </label>
                <Input
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="Например, 5 000 000"
                  className="bg-background border-border h-12"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Комментарий
                </label>
                <Textarea
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="Что планируете взять в лизинг?"
                  className="bg-background border-border min-h-[90px]"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full gold-gradient text-primary-foreground font-semibold h-14 hover:opacity-90"
              >
                Отправить заявку
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 bg-card/40 border-y border-border/60">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-14">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-bold">Частые вопросы</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border/60 rounded-sm px-6 bg-background"
              >
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

      {/* CONTACTS / FOOTER */}
      <footer id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <span className="font-display text-2xl font-bold">
                Лизинг<span className="gold-text-gradient">Про</span>
              </span>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Помогаем бизнесу получать самые выгодные условия лизинга на
                территории России.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg mb-2">Контакты</h4>
              <a href="tel:+74950000000" className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors">
                <Icon name="Phone" size={18} /> +7 (495) 000-00-00
              </a>
              <a href="mailto:info@leasingpro.ru" className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors">
                <Icon name="Mail" size={18} /> info@leasingpro.ru
              </a>
              <p className="flex items-center gap-3 text-muted-foreground">
                <Icon name="MapPin" size={18} /> Москва, Пресненская наб., 12
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Разделы</h4>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} className="text-muted-foreground hover:text-gold transition-colors">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border/60 text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-4">
            <span>© 2026 ЛизингПро. Все права защищены.</span>
            <span>Подбор предложений бесплатен и ни к чему не обязывает.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;