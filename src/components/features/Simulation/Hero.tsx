import PiggyBankImage from '@/assets/images/piggy-bank.png'

export function SimulationHero() {
  return (
    <div className="mb-8 text-center">
      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
        <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">
          Vamos planejar seu futuro
        </h1>
        <img
          src={PiggyBankImage}
          alt=""
          aria-hidden="true"
          className="h-12 w-12 object-contain sm:h-16 sm:w-16"
        />
      </div>
      <p className="text-muted-foreground mt-2 text-sm">
        Responda algumas questões para ter insights financeiros personalizados.
      </p>
    </div>
  )
}
