import { CalendarClock, Goal, PiggyBank, Trash2, Wallet } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/shared/Button'
import { PageHero } from '@/components/shared/PageHero'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { calcMonthlySavings } from '@/utils/simulation'

export const SimulationHistoryPage = () => {
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()
  // Inicialização direta e segura no useState (sem precisar de useEffect)
  const [simulations, setSimulations] = useState<SimulationRecord[]>(() => {
    return getAllSimulations() || []
  })

  const navigate = useNavigate()

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setSimulations((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Reveja ou continue de onde parou em cada uma das suas metas."
      />

      {simulations.length === 0 ? (
        <div className="bg-card flex flex-col items-center gap-4 rounded-2xl p-10 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
          <Goal size={28} className="text-muted-primary" />
          <p className="text-muted-foreground text-sm">
            Nenhuma simulação encontrada no histórico.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Criar nova simulação
          </Button>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {simulations.map((item) => {
            const monthlySavings = calcMonthlySavings(item)

            return (
              <li
                key={item.id}
                className="bg-card flex flex-col gap-4 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-muted-primary/10 flex size-10 shrink-0 items-center justify-center rounded-full">
                    <Goal size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      {item.goalName || 'Meta sem nome'}
                    </p>
                    <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                      <span className="flex items-center gap-1">
                        <Wallet size={12} />
                        {item.goalAmount}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarClock size={12} />
                        {item.goalDeadline} meses
                      </span>
                      <span className="flex items-center gap-1">
                        <PiggyBank size={12} />
                        R${' '}
                        {monthlySavings.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                        /mês
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Button
                    variant="primary"
                    className="px-4 py-2 text-xs"
                    onClick={() => navigate(`/resultado/${item.id}`)}
                  >
                    Ver resultado
                  </Button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    aria-label="Excluir simulação"
                    className="text-muted-foreground flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl transition-opacity hover:text-red-500 hover:opacity-80"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      <Link
        to="/"
        className="text-muted-foreground hover:text-foreground mt-8 inline-block text-sm transition-colors"
      >
        ← Voltar para o formulário
      </Link>
    </main>
  )
}
