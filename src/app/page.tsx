'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Clock, Sparkles, BookOpen, MessageSquare, Users, Facebook, Twitter, Linkedin, Link2, Star, TrendingUp, ArrowUp } from 'lucide-react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [scrollY, setScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const targetDate = new Date('2025-11-28T23:59:59');

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Parallax effect, scroll to top visibility, and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setScrollY(scrollTop);
      setShowScrollTop(scrollTop > 500);
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = 'BLACK FRIDAY SALG - Opptil 50% rabatt på skrivekurs fra Forfatterskolen!';

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link kopiert!');
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-300 bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Banner */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-black py-3 px-4 shadow-2xl backdrop-blur-sm">
        <div className="container mx-auto text-center font-bold">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="w-5 h-5 animate-pulse" />
            BLACK FRIDAY SALG - OPPTIL 58% RABATT
            <Sparkles className="w-5 h-5 animate-pulse" />
          </span>
        </div>
      </div>

      {/* Hero Section with Parallax */}
      <section className="relative overflow-hidden py-20 px-4">
        <div
          className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent`}
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <img
              src="https://ugc.same-assets.com/0zREunMtS1Ytg0cmSrWmExqlgavoVLCK.png"
              alt="FORFATTERSKOLEN"
              className="mx-auto h-12 md:h-16 animate-fadeIn"
              loading="eager"
            />

            <Badge className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-lg animate-redGlow animate-float">
              BEGRENSET TILBUD
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight break-words animate-fadeIn" style={{ transform: `translateY(${scrollY * -0.1}px)` }}>
              <span className="text-white">Knallrabatt</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500">
                på våre mest populære
              </span>{' '}
              <span className="text-white">skrivekurs!</span>
            </h1>

            {/* Social Share Buttons */}
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="bg-white/10 border-white/20 hover:bg-white/20"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="bg-white/10 border-white/20 hover:bg-white/20"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('linkedin')}
                className="bg-white/10 border-white/20 hover:bg-white/20"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('copy')}
                className="bg-white/10 border-white/20 hover:bg-white/20"
              >
                <Link2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-4 py-8">
              {[
                { label: 'Dager', value: timeLeft.days },
                { label: 'Timer', value: timeLeft.hours },
                { label: 'Minutter', value: timeLeft.minutes },
                { label: 'Sekunder', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={item.label} className="flex flex-col items-center animate-scaleIn" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="bg-gradient-to-br from-amber-500 to-yellow-600 text-black rounded-lg p-4 min-w-[80px] shadow-2xl hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl md:text-4xl font-bold">{String(item.value).padStart(2, '0')}</span>
                  </div>
                  <span className="text-sm mt-2 text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="relative max-w-md mx-auto">
              <img
                src="https://ugc.same-assets.com/6tzzP8pKcr4s-5XG5vFdUabgZ7-wBsAB.jpeg"
                alt="Black Friday Sale"
                className="rounded-lg shadow-2xl border-4 border-amber-500"
                loading="lazy"
              />
            </div>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Visste du at alle som skriver synes det er vanskelig? Jepp, også erfarne forfattere.
              Heldigvis er det med skriving som det meste annet: Jo mer du kan, jo bedre verktøy du har
              og jo mer du trener – desto bedre blir du.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-12 animate-bounce">
          <ChevronDown className="w-8 h-8 text-amber-500" />
        </div>
      </section>

      {/* Why Section */}
      <section className={`py-20 px-4 bg-gradient-to-b from-zinc-900 to-black`}>
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 break-words px-4">
            Er det <span className="text-amber-500">din tur</span> nå?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <BookOpen className="w-12 h-12" />,
                title: 'Nyttige skriveverktøy',
                description: 'og kunnskap om håndverket.',
              },
              {
                icon: <MessageSquare className="w-12 h-12" />,
                title: 'Profesjonell tilbakemelding',
                description: 'på manuset ditt',
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: 'En heiagjeng',
                description: 'i gode og onde skrivedager!',
              },
            ].map((feature, idx) => (
              <Card key={idx} className="bg-zinc-800/50 border-amber-500/20 hover:border-amber-500 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-amber-500/20 animate-fadeIn group" style={{ animationDelay: `${idx * 0.15}s` }}>
                <CardContent className="pt-6 text-center">
                  <div className="text-amber-500 flex justify-center mb-4 group-hover:scale-125 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="font-bold text-lg mb-2 text-[#ffffff] group-hover:text-amber-400 transition-colors">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 break-words px-4">
            Hva synes <span className="text-amber-500">elevene våre</span>?
          </h2>
          <p className="text-center text-gray-400 mb-16">Over 1000 fornøyde kursdeltakere</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Petter Fergested',
                role: 'Forfatter',
                text: 'Det har vært en stor glede å bli kjent med rektor Kristine Henningsen og resten av Forfatterskolen. Jeg har lært å skrive med hjertet uten å miste hodet, og lært å se forskjellen. Kristine har enestående evner til å inspirere og oppmuntre.',
                rating: 5,
              },
              {
                name: 'Tone Bie',
                role: 'Forfatter, Bladkompaniet',
                text: 'Jeg meldte meg på det skjønlitterære kurset til Forfatterskolen, for å få utfordret meg selv på det å dele tekster med andre og få nyttige verktøy i skrivingen. Da Bladkompaniet litt senere på året utlyste en romanserieutlysning, tok jeg endelig mot til meg og sendte inn et bidrag.',
                rating: 5,
              },
              {
                name: 'Linda Skomakerstuen',
                role: 'Forfatter, Gyldendal',
                text: 'Nettverket jeg har fått gjennom Forfatterskolen har vært gull verdt – ikke bare under skriveprosessen, men også etterpå. Jeg vet ikke om jeg hadde klart det uten Forfatterskolen, og den støtten det ligger i å være en del av et skrivfellesskap.',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="bg-zinc-800/50 border-amber-500/20 hover:border-amber-500 transition-all duration-500 animate-slideInLeft hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20 group" style={{ animationDelay: `${idx * 0.2}s` }}>
                <CardHeader>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500 group-hover:scale-125 transition-transform duration-300" />
                    ))}
                  </div>
                  <CardTitle className="text-lg text-[#ffffff]">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm leading-relaxed">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ready Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-zinc-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 break-words px-4">
            Klar for å gi <span className="text-amber-500">drømmen</span> en sjanse?
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Akkurat nå kjører vi BLACK FRIDAY-RABATT på flere av våre mest populære skrivekurs!
            Dermed har du mulighet til å realisere forfatterdrømmen, samtidig som du er snill mot lommeboken.
          </p>
          <p className="text-lg text-amber-400 font-semibold">
            (gjelder frem til fredag 28. november, klokken 23:59)
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-zinc-900 to-black">
        <div className="container mx-auto max-w-6xl space-y-20">
          {/* Årskurs */}
          <CourseCard
            title="Årskurs"
            startDate="26 januar 2026"
            discount="6000,-"
            discountBadge="SPAR 6000 KR"
            imageAlt="Årskurs"
            highlights={[
              'Flere tilbakemeldinger fra erfaren redaktør (70 000 ord, fordelt på 4 innleveringer)',
              'Live coaching med din personlige redaktør (30 min samtale)',
              'Superbonus! Du er garantert en utgivelse i løpet av dette året!',
              'Bonus 1: Personlig skrivetrener gjennom hele kursåret.',
              'Bonus 2! Etter endt kurs hjelper vi deg mot en utgivelse',
            ]}
            buttonText="Årskurs med kroner 6000,- i rabatt"
            buttonLink="https://www.forfatterskolen.no/course/119"
            isMostPopular={true}
            paymentMonths={12}
          />

          {/* Barnebokkurs */}
          <CourseCard
            title="Barnebokkurs med Gro Dahle"
            startDate="16 februar 2026"
            discount="7000,-"
            discountBadge="MASSIV RABATT"
            imageAlt="Barnebokkurs"
            highlights={[
              '10 kursmoduler med skriftlig materiale og tilhørende videoer',
              'Skriveøvelser og oppgaver med tilbakemelding fra profesjonell redaktør',
              '9 kurswebinarer med Gro Dahle',
              'Inspirerende mentormøter med kjente forfattere',
              'Bonus! Et 4 timers skrivekurs med Tom Egeland!',
            ]}
            buttonText="Barnebokkurs med kroner 7000,- i rabatt"
            buttonLink="https://www.forfatterskolen.no/course/117"
            isMostPopular={false}
            paymentMonths={6}
          />

          {/* Romankurs */}
          <CourseCard
            title="Romankurs med flere lærere"
            startDate="20 april 2026"
            discount="6000,-"
            discountBadge="SPAR 6000 KR"
            imageAlt="Romankurs"
            highlights={[
              '10 kursmoduler med skriftlig materiale og tilhørende videoer',
              '10 kurswebinarer med ulike skrivelærere',
              'Live webinarer med noen av landets beste skrivelærere',
              'Tilgang på et rikt webinar-arkiv med hundrevis av opptak',
              'Bonus! Et 4 timers skrivekurs med Tom Egeland!',
            ]}
            buttonText="Romankurs med kroner 6000,- i rabatt"
            buttonLink="https://www.forfatterskolen.no/course/121"
            isMostPopular={true}
            paymentMonths={6}
          />
        </div>
      </section>

      {/* Reprise Courses */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 break-words px-4">
              Populære <span className="text-amber-500">reprisekurs</span>
            </h2>
            <p className="text-xl text-gray-300">- kan startes øyeblikkelig!</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'DIKTKURS med Gro Dahle', discount: '3000,-', link: 'https://www.forfatterskolen.no/course/57' },
              { title: 'SKRIV DITT LIV med Kjersti Wold', discount: '3000,-', link: 'https://www.forfatterskolen.no/course/50' },
              { title: 'SAKPROSAKURS med Kjersti Wold', discount: '2000,-', link: 'https://www.forfatterskolen.no/course/49' },
              { title: 'SKRIV FOR FILM & TV med Kjersti Steinsbø', discount: '5000,-', link: 'https://www.forfatterskolen.no/course/56' },
              { title: 'SERIEROMANKURS med Ida Skjeldbakken og Kaja Nyhus', discount: '5000,-', link: 'https://www.forfatterskolen.no/course/44' },
              { title: 'KRIMKURS med Tom Egeland', discount: '4000,-', link: 'https://www.forfatterskolen.no/course/37' },
            ].map((course, idx) => (
              <Card key={idx} className="bg-zinc-800/50 border-amber-500/20 hover:border-amber-500 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20 animate-fadeIn group" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardHeader>
                  <Badge className="bg-red-600 w-fit mb-2 animate-redGlow animate-float">Rabatt kr {course.discount}</Badge>
                  <CardTitle className="text-base md:text-lg text-[#ffffff] break-words">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full min-h-[56px] md:min-h-[48px] bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold hover:shadow-xl transition-all hover:scale-105 duration-300">
                    <a href={course.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      Se kurs
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold text-lg px-8 min-h-[56px] md:min-h-[48px] hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/50">
              <a href="https://www.forfatterskolen.no/course" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                Se alle de rabatterte reprisekursene her
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Risk-Free Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-zinc-900 to-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 break-words px-4">
            Kjøp skrivekurs i dag - <span className="text-amber-500">helt uten risiko!</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Vi har 14 dagers angrerett på alle våre kurs, fra første kursdag, så det er null risiko ved å melde deg på i dag.
            Du kan sikre plassen din nå og betale senere.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold text-lg px-12 py-6 min-h-[56px] md:min-h-[48px] hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/50">
            <a href="https://www.forfatterskolen.no/course" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              Våre rabatterte skrivekurs
            </a>
          </Button>
          <p className="text-sm text-gray-400 mt-4">
            NB! Rabatten er innbakt i prisen som kommer opp, og utløper fredag 28. november, klokken 23:59
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 border-t border-zinc-800`}>
        <div className={`container mx-auto text-center text-gray-400`}>
          <p className="mb-4">
            <Clock className="inline w-4 h-4 mr-2" />
            Det gunstige Black Week-tilbudet gjelder kun frem til <strong className="text-amber-500">fredag 28. november klokken 23:59</strong>
          </p>
          <p className="text-sm mb-2">Alle rettigheter 2025, Forfatterskolen</p>
          <p className="text-xs text-gray-500">
            Laget av <a href="mailto:post@forfatterskolen.no" className="text-amber-500 font-medium hover:text-amber-400 transition-colors">Sven Inge Henningsen</a> - Forfatterskolen
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-amber-500 to-yellow-500 text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-fadeIn hover:shadow-amber-500/50"
          aria-label="Scroll til toppen"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

function CourseCard({
  title,
  startDate,
  discount,
  discountBadge,
  imageAlt,
  highlights,
  buttonText,
  buttonLink,
  isMostPopular = false,
  paymentMonths = 24,
}: {
  title: string;
  startDate: string;
  discount: string;
  discountBadge: string;
  imageAlt: string;
  highlights: string[];
  buttonText: string;
  buttonLink: string;
  isMostPopular?: boolean;
  paymentMonths?: number;
}) {
  return (
    <Card className="bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-amber-500/30 hover:border-amber-500 transition-all duration-500 overflow-hidden relative animate-scaleIn hover:scale-[1.03] hover:shadow-2xl hover:shadow-amber-500/20 group">
      {isMostPopular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-center py-2 font-bold text-sm flex items-center justify-center gap-2 z-10 animate-shimmer">
          <TrendingUp className="w-4 h-4 animate-pulse" />
          MEST POPULÆRT
          <TrendingUp className="w-4 h-4 animate-pulse" />
        </div>
      )}

      <div className={`absolute ${isMostPopular ? 'top-14' : 'top-4'} right-4 z-10`}>
        <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 text-sm shadow-lg animate-redGlow animate-float">
          {discountBadge}
        </Badge>
      </div>

      <CardHeader className={isMostPopular ? 'pt-16' : ''}>
        <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 break-words text-white">{title}</CardTitle>
        <CardDescription className="text-base md:text-lg">
          Oppstart: <span className="text-amber-400 font-semibold">{startDate}</span>
        </CardDescription>
        <div className="text-xl md:text-2xl font-bold text-amber-500 mt-2 break-words">
          Black Friday-rabatt: Kroner {discount}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          {highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-3 animate-fadeIn" style={{ animationDelay: `${idx * 0.1}s` }}>
              <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5 animate-pulse" />
              <p className="text-sm md:text-base text-gray-300 break-words">{highlight}</p>
            </div>
          ))}
        </div>

        <Button asChild size="lg" className="w-full min-h-[56px] md:min-h-[48px] bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold text-base md:text-lg break-words relative overflow-hidden group hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/50">
          <a href={buttonLink} target="_blank" rel="noopener noreferrer" className="break-words hyphens-auto flex items-center justify-center">
            <span className="relative z-10">{buttonText}</span>
            <span className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </a>
        </Button>

        <p className="text-xs text-center text-gray-400">
          NB! Rabatten er innbakt i prisen som står på siden, og utløper fredag 28. november, klokken 23:59.
          Beløpet kan delbetales over {paymentMonths} måneder (rentefritt).
        </p>
      </CardContent>
    </Card>
  );
}
