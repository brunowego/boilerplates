'use client'

import type { JSX } from 'react'

import Button from '@acme/ui/components/button'
import {
  Play,
  FilePenLine,
  Target,
  BookOpenCheck,
  Check,
} from '@acme/ui/components/icon'
import Accordion from '@acme/ui/components/accordion'

export default function Page(): JSX.Element {
  return (
    <>
      <header>
        <div className='bg-purple-500'>
          <div className='container'>
            <p className='p-4 text-center lg:px-5'>
              <strong>⚠️ Atenção: as vagas na mentoria são limitadas!</strong>{' '}
              Faça a sua aplicação.
            </p>
          </div>
        </div>

        <div
          className='bg-center bg-cover bg-no-repeat lg:h-[640px]'
          style={{ backgroundImage: 'url("/static/img/bg-hero.webp")' }}
        >
          <div className='container grid py-8 md:grid-cols-2 max-md:bg-background/60 lg:py-24 md:py-10'>
            <div>
              <img
                alt='Acme'
                className='h-10 lg:h-16 md:h-12'
                src='/static/img/logo.webp'
              />

              <div className='mb-8' />

              <h1 className='text-3xl leading-tight lg:text-5xl'>
                O caminho{' '}
                <span className='underline underline-offset-4'>
                  mais rápido
                </span>{' '}
                para{' '}
                <strong className='text-purple-400'>
                  conquistar a sua vaga na perícia de Pernambuco
                </strong>
                !
              </h1>

              <div className='mb-4' />

              <p>
                Torne-se um <strong>Perito Criminal Oficial</strong> em tempo
                recorde!
              </p>

              <div className='mb-4' />

              <Button
                className='!font-semibold w-full max-w-lg bg-yellow-300'
                size='lg'
              >
                Quero ser perito criminal!
              </Button>

              <div className='mb-4' />

              <p className='text-sm'>
                Clique no botão e faça a sua aplicação. as vagas são limitadas!
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className='bg-neutral-900'>
        <div className='container py-10 md:py-14'>
          <h2 className='text-center text-2xl lg:text-3xl'>
            Quem já{' '}
            <strong className='text-purple-400'>trilhou este caminho</strong>
          </h2>

          <div className='mb-12' />

          <div className='grid gap-6 md:grid-cols-3'>
            <a
              className='relative aspect-video rounded-lg bg-center bg-cover bg-no-repeat outline outline-yellow-300'
              href='/'
              style={{ backgroundImage: 'url("/static/img/thumb-1.webp")' }}
            >
              <Play className='absolute inset-0 m-auto size-12 fill-yellow-300 stroke-yellow-300' />
            </a>

            <a
              className='relative aspect-video rounded-lg bg-center bg-cover bg-no-repeat outline outline-yellow-300'
              href='/'
              style={{ backgroundImage: 'url("/static/img/thumb-1.webp")' }}
            >
              <Play className='absolute inset-0 m-auto size-12 fill-yellow-300 stroke-yellow-300' />
            </a>

            <a
              className='relative aspect-video rounded-lg bg-center bg-cover bg-no-repeat outline outline-yellow-300'
              href='/'
              style={{ backgroundImage: 'url("/static/img/thumb-1.webp")' }}
            >
              <Play className='absolute inset-0 m-auto size-12 fill-yellow-300 stroke-yellow-300' />
            </a>
          </div>

          <div className='mb-10' />

          <Button
            className='!flex !font-semibold mx-auto w-full max-w-lg bg-yellow-300'
            size='lg'
          >
            Quero ser perito criminal!
          </Button>
        </div>

        <div className='container py-14'>
          <h3 className='mx-auto max-w-lg text-center text-2xl md:text-3xl'>
            A <strong className='text-purple-400 uppercase'>Excelere</strong> é{' '}
            <span className='underline underline-offset-4'>
              diferente de tudo
            </span>{' '}
            que você já viu!
          </h3>
        </div>

        <div
          className='bg-center bg-cover bg-no-repeat'
          style={{ backgroundImage: 'url("/static/img/bg-map.webp")' }}
        >
          <div className='container grid gap-x-6 py-16 md:grid-cols-2 max-md:bg-background/60'>
            <div />

            <div className='space-y-4'>
              <p>
                O método da mentoria vai{' '}
                <strong>muito além da preparação convencional</strong>
                com cursos preparatórios!
              </p>

              <p>
                Veja bem… muitos cursos dizem ser só para Perito Criminal, mas
                só reciclam coisas de outros lugares.
              </p>

              <p>
                E quem compra esses cursos acaba{' '}
                <span className='underline underline-offset-4'>
                  ficando perdido
                </span>
                , sem saber como estudar direito, sem saber o que realmente é
                importante para a prova.
              </p>

              <p className='rounded-lg p-4 outline outline-purple-400'>
                ⚠️ Esses cursos genéricos só enchem os alunos de PDFs e
                videoaulas intermináveis, com assuntos desconexos e confusos!
              </p>
            </div>
          </div>
        </div>

        <div
          className='bg-center bg-cover bg-no-repeat'
          style={{ backgroundImage: 'url("/static/img/bg-web.webp")' }}
        >
          <div className='container grid gap-x-6 py-16 md:grid-cols-2 max-md:bg-background/60'>
            <div className='space-y-4'>
              <p>
                Na <strong>Excelere</strong>, você vai aprender a{' '}
                <span className='underline underline-offset-4'>
                  aproveitar o que já tem de graça na internet
                </span>
                , usar melhor o material que tem para concurso de Perito (mesmo
                que não seja específico).
              </p>

              <p>
                Não importa o material, você vai{' '}
                <strong>estudar o que realmente importa</strong>e fazer isso
                <span className='underline underline-offset-4'>
                  fixar na memória
                </span>
                !
              </p>

              <p>
                Vamos te ensinar as melhores técnicas da Neurociência que fazem
                o cérebro <strong>memorizar e aprender mais conteúdos</strong>,
                de forma mais rápida e eficiente. Sem desperdiçar tempo!
              </p>
            </div>

            <div />
          </div>
        </div>

        <div className='container my-10'>
          <Button
            className='!flex !font-semibold mx-auto w-full max-w-lg bg-yellow-300'
            size='lg'
          >
            Quero ser perito em Pernambuco!
          </Button>
        </div>
      </section>

      <section
        className='bg-center bg-cover bg-no-repeat'
        style={{ backgroundImage: 'url("/static/img/bg-radial.webp")' }}
      >
        <div className='container py-16'>
          <h2 className='mx-auto max-w-2xl text-center text-2xl md:text-3xl'>
            Vamos te guiar a construir uma{' '}
            <strong className='text-purple-400'>estratégia de estudos</strong>{' '}
            eficiente.
          </h2>

          <div className='mb-4' />

          <p className='mx-auto max-w-xl text-center'>
            Com os{' '}
            <strong className='text-yellow-300'>três pilares excelere</strong>{' '}
            você irá combater a procrastinação, falta de disciplina e falta de
            foco, trilhando uma jornada de aprendizado{' '}
            <span className='underline underline-offset-4'>
              personalizada e acelerada
            </span>
            .
          </p>

          <div className='mb-10' />

          <div className='grid gap-6 md:grid-cols-3'>
            <div className='rounded-2xl bg-neutral-900 p-8'>
              <FilePenLine className='mb-4 size-12 stroke-purple-400' />

              <h3 className='mb-2 font-semibold text-xl uppercase'>
                Planejamento
              </h3>

              <p>
                Aproveite todo seu tempo disponível para estudar, sem se
                preocupar com organização e planejamento.
              </p>
            </div>

            <div className='rounded-2xl bg-neutral-900 p-8'>
              <Target className='mb-4 size-12 stroke-purple-400' />

              <h3 className='mb-2 font-semibold text-xl uppercase'>
                Direcionamento
              </h3>

              <p>
                Seus estudos serão específicos para Perito Criminal. Sem perder
                tempo, você estuda exatamente o que cai na prova.
              </p>
            </div>

            <div className='rounded-2xl bg-neutral-900 p-8'>
              <BookOpenCheck className='mb-4 size-12 stroke-purple-400' />

              <h3 className='mb-2 font-semibold text-xl uppercase'>
                Aperfeiçoamento
              </h3>

              <p>
                Mude sua forma de estudar! Descarte métodos ineficazes e abrace
                técnicas de estudo validadas e comprovadas.
              </p>
            </div>
          </div>

          <div className='mb-10' />

          <Button
            className='!flex !font-semibold mx-auto w-full max-w-lg bg-yellow-300'
            size='lg'
          >
            Quero ser perito criminal!
          </Button>

          <div className='mb-24' />

          <h2 className='mx-auto max-w-2xl text-center text-3xl'>
            Veja como vamos te guiar rumo à{' '}
            <strong className='text-purple-400'>aprovação acelerada</strong>!
          </h2>

          <div className='mb-10' />

          <Accordion className='mx-auto max-w-2xl' collapsible type='single'>
            <Accordion.Item className='border-purple-400' value='item-1'>
              <Accordion.Trigger>
                Estratégia de estudos eficiente
              </Accordion.Trigger>

              <Accordion.Content>
                <p className='mb-4'>
                  Planejamento personalizado para otimizar seu tempo de estudo,
                  de acordo com os pesos de cada matéria no edital.
                </p>

                <p>
                  Direcionamento preciso sobre o que é essencial saber em cada
                  assunto, para o concurso de Perito.
                </p>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className='border-purple-400' value='item-2'>
              <Accordion.Trigger>Disciplina reforçada</Accordion.Trigger>

              <Accordion.Content>
                <p>
                  Metas claras, avaliações periódicas e um mentor dedicado
                  garantem consistência e disciplina nos seus estudos.
                </p>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className='border-purple-400' value='item-3'>
              <Accordion.Trigger>Organização descomplicada</Accordion.Trigger>

              <Accordion.Content>
                <p className='mb-4'>Esqueça a preocupação com planejamento.</p>

                <p>
                  Nós cuidamos do seu cronograma para que você foque apenas nos
                  estudos, inclusive o planejamento de revisões!
                </p>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className='border-purple-400' value='item-4'>
              <Accordion.Trigger>Mentoria individualizada</Accordion.Trigger>

              <Accordion.Content>
                <p className='mb-4'>
                  Acompanhamento individual por especialistas em concursos de
                  Perito Criminal.
                </p>

                <p>
                  Você também terá avaliações periódicas de desempenho para
                  garantir seu progresso constante.
                </p>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className='border-purple-400' value='item-5'>
              <Accordion.Trigger>Metodologia comprovada</Accordion.Trigger>

              <Accordion.Content>
                <p className='mb-4'>
                  Desenvolvida e aprimorada pela nossa fundadora, Leilane Verga,
                  aprovada três vezes nas primeiras colocações para o concurso
                  de Perito Criminal e mentora para concursos desde 2017.
                </p>

                <p>
                  Mais de 2.000 mentorados já aceleraram a aprovação com o nosso
                  acompanhamento.
                </p>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>

          <div className='mb-10' />

          <Button
            className='!flex !font-semibold mx-auto w-full max-w-lg bg-yellow-300'
            size='lg'
          >
            Quero ser perito criminal!
          </Button>
        </div>
      </section>

      <section className='bg-neutral-950 py-16'>
        <div className='container'>
          <h2 className='mx-auto max-w-2xl text-center text-3xl'>
            Veja o que dizem nossos alunos que já{' '}
            <strong className='text-purple-400'>aceleraram a aprovação</strong>{' '}
            com o Mapa
          </h2>

          <div className='mb-10' />

          <div
            className='mx-auto grid max-w-5xl rounded-2xl bg-center bg-cover bg-no-repeat p-8 outline outline-2 outline-yellow-300 md:grid-cols-3 md:p-14'
            style={{
              backgroundImage: 'url("/static/img/bg-distinctive.webp")',
            }}
          >
            <div className='col-span-2'>
              <p className='mb-6 text-2xl leading-relaxed'>
                A carreira de Perito Criminal chega a ter a{' '}
                <strong className='text-yellow-300'>
                  remuneração inicial de 27 mil reais
                </strong>
                , e a média dos estados é de{' '}
                <strong className='text-yellow-300'>
                  R$15 mil de salário inicial
                </strong>
                .
              </p>

              <Button className='!font-semibold !px-10 bg-yellow-300' size='lg'>
                Quero ser perito criminal!
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        className='bg-center bg-cover bg-no-repeat'
        style={{ backgroundImage: 'url("/static/img/bg-expert.webp")' }}
      >
        <div className='container grid py-24 md:grid-cols-7 max-md:bg-background/60'>
          <div className='col-span-3'>
            <h3 className='max-w-lg text-3xl'>
              Por que escolher o{' '}
              <strong className='text-purple-400'>Mapa Concursos</strong> para
              te mentorar?
            </h3>

            <div className='mb-8' />

            <p className='mb-4 rounded-lg p-4 outline outline-yellow-300'>
              ✅ Resultados Comprovados: tivemos alunos aprovados em todos os
              concursos de Perito Criminal de 2021 a 2023.
            </p>

            <p className='mb-4 rounded-lg p-4 outline outline-yellow-300'>
              ✅ Personalização Total: cronograma personalizado, avaliação dos
              pontos de melhoria e feedbacks individualizados.
            </p>

            <p className='mb-4 rounded-lg p-4 outline outline-yellow-300'>
              ✅ Experiência Especializada: mentoria direcionada exclusivamente
              para o concurso de Perito Criminal.
            </p>
          </div>
        </div>
      </section>

      <section
        className='bg-center bg-cover bg-no-repeat'
        style={{ backgroundImage: 'url("/static/img/bg-radial.webp")' }}
      >
        <div className='container grid gap-8 py-24 md:grid-cols-2'>
          <div className='flex items-center'>
            <h3 className='text-3xl'>
              Veja os diferenciais da nossa{' '}
              <strong className='text-purple-400'>Mentoria Excelere</strong>:
            </h3>
          </div>

          <div>
            <ul className='flex flex-col divide-y divide-purple-400 *:py-4 first:*:pt-0 last:*:pb-0'>
              <li className='flex space-x-3'>
                <Check className='size-5 shrink-0 stroke-green-400' />

                <p>
                  <strong>Aprovação Acelerada:</strong> mais resultados em menos
                  tempo com estratégias direcionadas.
                </p>
              </li>

              <li className='flex space-x-3'>
                <Check className='size-5 shrink-0 stroke-green-400' />

                <p>
                  <strong>Especialização Exclusiva:</strong> única plataforma
                  totalmente especializada em concursos de Perito Criminal.
                </p>
              </li>

              <li className='flex space-x-3'>
                <Check className='size-5 shrink-0 stroke-green-400' />

                <p>
                  <strong>Proximidade com o Mentor:</strong> acompanhamento
                  individual para esclarecer dúvidas e análise periódica de
                  desempenho.
                </p>
              </li>

              <li className='flex space-x-3'>
                <Check className='size-5 shrink-0 stroke-green-400' />

                <p>
                  <strong>Metodologia de estudos sem resumo:</strong> métodos de
                  aprendizagem acelerada para estudar até 5x mais rápido, sem
                  perder eficácia.
                </p>
              </li>

              <li className='flex space-x-3'>
                <Check className='size-5 shrink-0 stroke-green-400' />

                <p>
                  <strong>Comunidade Engajada:</strong> conecte-se com outros
                  concurseiros da perícia criminal e compartilhe experiências.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className='bg-gradient-to-r from-violet-900 to-violet-950'>
        <div className='container grid gap-8 py-16 md:grid-cols-2 md:py-24'>
          <div className='flex items-center'>
            <h3 className='text-3xl'>
              Ainda em dúvida?{' '}
              <strong className='text-yellow-300'>Assista ao vídeo</strong> e
              conheça a Mentoria de perto:
            </h3>
          </div>

          <div>
            <a
              className='relative block aspect-video rounded-lg bg-center bg-cover bg-no-repeat outline outline-yellow-300'
              href='/'
              style={{ backgroundImage: 'url("/static/img/thumb-1.webp")' }}
            >
              <Play className='absolute inset-0 m-auto size-12 fill-yellow-300 stroke-yellow-300' />
            </a>
          </div>
        </div>
      </section>

      <footer className='container text-center'>
        <p className='p-4'>
          &copy; Todos os direitos reservados. MAPA CURSOS PREPARATÓRIOS PARA
          CONCURSOS LTDA - CNPJ: 33.178.827/0001-49
        </p>
      </footer>
    </>
  )
}
