'use client';

import { useEffect, useRef, useState } from 'react';

type AnswerKey = 'age' | 'wish' | 'fromWilliam' | 'lesson';
type Answers = Record<AnswerKey, string>;

type Question = {
  key: AnswerKey;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  label: string;
  placeholder: string;
  nextLabel: string;
  multiline?: boolean;
};

const WILLIAM_WHATSAPP = '';

const QUESTIONS: Question[] = [
  {
    key: 'age',
    eyebrow: 'First question',
    title: 'So… sekarang kamu resmi bertambah usia yang keberapa, nich? 🎂',
    paragraphs: [
      'Another year, another chapter. Another version of you to celebrate.',
      'Tell me, how old are you now?',
    ],
    label: 'I’m turning…',
    placeholder: 'Your age',
    nextLabel: 'Make a wish',
  },
  {
    key: 'wish',
    eyebrow: 'Second question',
    title: 'Now, close your eyes for a moment… and make a wish. ✨',
    paragraphs: [
      'Di usia yang baru ini, apa satu hal yang paling kamu harapkan terjadi dalam hidup kamu?',
      'It can be something big. It can be something simple. Or maybe… something you’ve been quietly wishing for.',
      'So, what’s your wish this year?',
    ],
    label: 'My wish this year is…',
    placeholder: 'Write your wish here. Take all the time you need…',
    nextLabel: 'One more question',
    multiline: true,
  },
  {
    key: 'fromWilliam',
    eyebrow: 'Third question',
    title: 'Okay, now let’s make it a little more interesting…',
    paragraphs: [
      'Kalau Aku dikasih kesempatan untuk mewujudkan satu harapan kamu…',
      'No matter how big it is. No matter how impossible it sounds.',
      'What would you ask me for? 🤍',
    ],
    label: 'If I could ask William for one thing…',
    placeholder: 'Dream as big—or as simply—as you want…',
    nextLabel: 'The important one',
    multiline: true,
  },
  {
    key: 'lesson',
    eyebrow: 'The most important question',
    title: 'Apa satu pelajaran paling berarti yang kamu dapat dari perjalanan kamu sejauh ini?',
    paragraphs: [
      'And now… one question about the year you’re leaving behind.',
      'Selama perjalanan kamu sampai di usia sekarang, pasti ada banyak hal yang sudah kamu lewati.',
      'Ada yang bikin kamu bahagia. Ada yang mungkin bikin kamu kecewa. Ada yang ingin kamu ulang. Dan mungkin ada juga yang cukup kamu jadikan pelajaran.',
      'Bukan tentang seberapa sempurna kamu menjalani semuanya. Tapi tentang apa yang akhirnya kamu pahami, apa yang ingin kamu bawa ke chapter berikutnya, dan apa yang mungkin sudah waktunya kamu tinggalkan.',
      "Because growing older isn’t just about adding another number. It’s about becoming a better version of yourself.",
    ],
    label: 'The lesson I’m carrying forward is…',
    placeholder: 'What has this chapter taught you?',
    nextLabel: 'Read William’s letter',
    multiline: true,
  },
];

const EMPTY_ANSWERS: Answers = {
  age: '',
  wish: '',
  fromWilliam: '',
  lesson: '',
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [opened, setOpened] = useState(false);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem('oca-birthday-answers');
      if (saved) setAnswers({ ...EMPTY_ANSWERS, ...JSON.parse(saved) });
    } catch {
      // The experience still works when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    try {
      window.sessionStorage.setItem('oca-birthday-answers', JSON.stringify(answers));
    } catch {
      // Keep the answers in memory if browser storage is unavailable.
    }
  }, [answers]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (step > 0) window.setTimeout(() => headingRef.current?.focus(), 80);
  }, [step]);

  const question = step >= 1 && step <= 4 ? QUESTIONS[step - 1] : null;
  const currentAnswer = question ? answers[question.key].trim() : '';
  const completion = ((step + 1) / 6) * 100;

  function updateAnswer(key: AnswerKey, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function goForward() {
    if (step === 0 && !opened) {
      setOpened(true);
      return;
    }
    setStep((current) => Math.min(current + 1, 5));
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function whatsappUrl() {
    const number = WILLIAM_WHATSAPP.replace(/\D/g, '');
    const message = [
      'Hi William! 🤍',
      'Aku sudah selesai baca website-nya. Ini jawabanku:',
      '',
      `🎂 Umurku sekarang: ${answers.age}`,
      '',
      '✨ Harapanku tahun ini:',
      answers.wish,
      '',
      '🤍 Kalau kamu bisa mewujudkan satu harapanku:',
      answers.fromWilliam,
      '',
      '🌱 Pelajaran paling berarti yang aku bawa:',
      answers.lesson,
      '',
      'Thank you for the little birthday letter 💌',
    ].join('\n');
    const base = number ? `https://wa.me/${number}` : 'https://wa.me/';
    return `${base}?text=${encodeURIComponent(message)}`;
  }

  return (
    <main className={`birthday-shell step-${step}`}>
      <div className="paper-grain" aria-hidden="true" />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <button
          type="button"
          className="wordmark"
          onClick={() => setStep(0)}
          aria-label="Return to the beginning"
        >
          <span className="wordmark-star">✦</span>
          <span>Oca&apos;s Birthday</span>
        </button>

        <div className="progress-wrap" aria-label={`Step ${step + 1} of 6`}>
          <span className="counter">{String(step + 1).padStart(2, '0')} <i>/ 06</i></span>
          <span className="progress-track" aria-hidden="true">
            <span style={{ width: `${completion}%` }} />
          </span>
        </div>
      </header>

      {step === 0 && (
        <section className={`opening-stage screen-enter ${opened ? 'is-open' : ''}`}>
          <div className="sparkle sparkle-one" aria-hidden="true">✦</div>
          <div className="sparkle sparkle-two" aria-hidden="true">✧</div>

          <div className="letter-scene" aria-live="polite">
            <article className="letter-card">
              <p className="letter-kicker">A little letter for</p>
              <h1>Oca</h1>
              <div className="tiny-rule" aria-hidden="true" />
              <p className="letter-copy">
                Tapi sebelum kamu baca sampai akhir, ada beberapa hal yang
                pengen aku tanyain ke kamu.
              </p>
              <p className="signature">Made especially for you&nbsp; ♡</p>
            </article>

            <div className="envelope" aria-hidden="true">
              <div className="envelope-back" />
              <div className="envelope-letter" />
              <div className="envelope-front" />
              <div className="envelope-flap" />
              <div className="wax-seal">W</div>
            </div>
          </div>

          <div className="intro-copy">
            <p className="pretitle">Psst… this one is for you</p>
            <h2>William has a letter for you. 💌</h2>
            <p>
              So… take your time, jawabnya yang jujur ya. Because this little
              website is made especially for you. 🤍
            </p>
            <button
              className="primary-button opening-button"
              type="button"
              onClick={goForward}
              aria-expanded={opened}
            >
              <span>{opened ? 'Begin the little journey' : 'Open the letter'}</span>
              <span className="button-icon" aria-hidden="true">{opened ? '→' : '♡'}</span>
            </button>
            <p className={`open-hint ${opened ? 'visible' : ''}`}>
              The letter is open—there are four little questions inside.
            </p>
          </div>
        </section>
      )}

      {question && (
        <section className="question-stage screen-enter" key={question.key}>
          <div className="question-copy">
            <div className="question-number" aria-hidden="true">
              <span>{String(step).padStart(2, '0')}</span>
            </div>
            <p className="pretitle">{question.eyebrow}</p>
            <h1 ref={headingRef} tabIndex={-1}>{question.title}</h1>
            <div className="question-paragraphs">
              {question.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>

          <div className="answer-card">
            <span className="tape tape-left" aria-hidden="true" />
            <span className="tape tape-right" aria-hidden="true" />
            <p className="answer-note">Your answer stays between you &amp; William</p>
            <label htmlFor={`answer-${question.key}`}>{question.label}</label>

            {question.multiline ? (
              <textarea
                id={`answer-${question.key}`}
                value={answers[question.key]}
                onChange={(event) => updateAnswer(question.key, event.target.value)}
                placeholder={question.placeholder}
                rows={step === 4 ? 7 : 6}
              />
            ) : (
              <div className="age-field">
                <input
                  id={`answer-${question.key}`}
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="120"
                  value={answers.age}
                  onChange={(event) => updateAnswer('age', event.target.value)}
                  placeholder={question.placeholder}
                />
                <span>years young</span>
              </div>
            )}

            <div className="answer-actions">
              <button className="back-button" type="button" onClick={goBack}>
                <span aria-hidden="true">←</span> Back
              </button>
              <button
                className="primary-button next-button"
                type="button"
                onClick={goForward}
                disabled={!currentAnswer}
              >
                <span>{question.nextLabel}</span>
                <span className="button-icon" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="closing-stage screen-enter">
          <div className="celebration-dots" aria-hidden="true">
            {['✦', '♡', '✧', '•', '♡', '✦', '•', '✧'].map((symbol, index) => (
              <span key={`${symbol}-${index}`}>{symbol}</span>
            ))}
          </div>

          <article className="closing-letter">
            <p className="pretitle">And finally…</p>
            <h1 ref={headingRef} tabIndex={-1}>Happy Birthday, you. 🤍</h1>
            <div className="closing-rule"><span>✦</span></div>

            <div className="closing-copy">
              <p>Terima kasih sudah sampai di sini.</p>
              <p>
                Mungkin website kecil ini nggak bisa menggambarkan seberapa
                berartinya kamu buat William.
              </p>
              <p>
                Aku berharap, di usia yang baru ini kamu menemukan lebih banyak
                alasan untuk tersenyum, lebih banyak hal untuk disyukuri, lebih
                banyak keberanian untuk mengejar apa yang kamu mau, dan lebih
                banyak momen yang nantinya bisa kamu kenang dengan bahagia.
              </p>
              <p>
                Semoga semua hal baik yang sedang kamu perjuangkan perlahan
                menemukan jalannya menuju kamu.
              </p>
              <p>
                And if someday you look back at this little website, I hope you
                remember one thing:
              </p>
              <p className="closing-emphasis">
                There was someone who genuinely wished for your happiness, your
                growth, and all the beautiful things waiting for you ahead.
              </p>
              <p>
                Happy birthday. 🎂<br />
                Keep growing. Keep dreaming.<br />
                And please… keep being you.
              </p>
            </div>

            <p className="william-signature">— William <span>🤍</span></p>
          </article>

          <aside className="answer-summary">
            <p className="pretitle">One last little thing</p>
            <h2>Send your answers to William?</h2>
            <p className="summary-intro">
              Nothing was sent or saved online. Tap below when you&apos;re ready,
              and your answers will be prepared as a WhatsApp message.
            </p>

            <div className="summary-list">
              <div><span>Age</span><p>{answers.age} years young</p></div>
              <div><span>Your wish</span><p>{answers.wish}</p></div>
              <div><span>Your ask</span><p>{answers.fromWilliam}</p></div>
              <div><span>Your lesson</span><p>{answers.lesson}</p></div>
            </div>

            <a className="whatsapp-button" href={whatsappUrl()} target="_blank" rel="noreferrer">
              <span className="whatsapp-mark" aria-hidden="true">↗</span>
              <span>Send my answers on WhatsApp</span>
            </a>
            <button className="edit-button" type="button" onClick={() => setStep(1)}>
              I want to edit an answer
            </button>
          </aside>
        </section>
      )}

      <footer className="site-footer">
        <span>Made for one very special day</span>
        <span className="footer-mark">With love, William</span>
      </footer>
    </main>
  );
}
