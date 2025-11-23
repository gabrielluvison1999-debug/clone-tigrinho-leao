'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Coins, Trophy, Zap } from 'lucide-react'

const symbols = ['🦁', '👑', '💎', '🌟', '🔥', '💰']
const symbolNames = {
  '🦁': 'Leão',
  '👑': 'Coroa',
  '💎': 'Diamante',
  '🌟': 'Estrela',
  '🔥': 'Fogo',
  '💰': 'Moeda'
}

export default function Home() {
  const [slots, setSlots] = useState(['🦁', '🦁', '🦁'])
  const [credits, setCredits] = useState(1000)
  const [isSpinning, setIsSpinning] = useState(false)
  const [lastWin, setLastWin] = useState(0)
  const [message, setMessage] = useState('Boa sorte! 🍀')
  const [spinCount, setSpin] = useState(0)

  const spin = () => {
    if (credits < 10 || isSpinning) return

    setIsSpinning(true)
    setCredits(credits - 10)
    setLastWin(0)
    setMessage('Girando...')
    
    // Animação de giro
    let count = 0
    const interval = setInterval(() => {
      setSlots([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ])
      count++
      
      if (count >= 20) {
        clearInterval(interval)
        finalizeSpin()
      }
    }, 100)
  }

  const finalizeSpin = () => {
    const finalSlots = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)]
    ]
    
    setSlots(finalSlots)
    setSpin(prev => prev + 1)
    
    // Verificar vitória
    if (finalSlots[0] === finalSlots[1] && finalSlots[1] === finalSlots[2]) {
      // Três iguais
      let prize = 0
      if (finalSlots[0] === '🦁') {
        prize = 500 // Jackpot do Leão!
        setMessage('🎉 JACKPOT DO LEÃO! +500 créditos!')
      } else if (finalSlots[0] === '💎') {
        prize = 300
        setMessage('💎 Três Diamantes! +300 créditos!')
      } else if (finalSlots[0] === '👑') {
        prize = 200
        setMessage('👑 Três Coroas! +200 créditos!')
      } else {
        prize = 100
        setMessage(`✨ Três ${symbolNames[finalSlots[0] as keyof typeof symbolNames]}! +100 créditos!`)
      }
      setCredits(prev => prev + prize)
      setLastWin(prize)
    } else if (finalSlots[0] === finalSlots[1] || finalSlots[1] === finalSlots[2] || finalSlots[0] === finalSlots[2]) {
      // Dois iguais
      const prize = 20
      setMessage('🎯 Dois iguais! +20 créditos!')
      setCredits(prev => prev + prize)
      setLastWin(prize)
    } else {
      setMessage('😔 Tente novamente!')
    }
    
    setIsSpinning(false)
  }

  const addCredits = () => {
    setCredits(prev => prev + 500)
    setMessage('💰 +500 créditos adicionados!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-300 mb-2 drop-shadow-2xl flex items-center justify-center gap-3">
            🦁 LEÃO DA SORTE
          </h1>
          <p className="text-yellow-100 text-lg">O Rei dos Slots!</p>
        </div>

        {/* Card Principal */}
        <Card className="bg-gradient-to-b from-amber-950 to-amber-900 border-4 border-yellow-600 shadow-2xl p-6 md:p-8">
          {/* Créditos */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-yellow-900/50 px-4 py-2 rounded-lg border-2 border-yellow-600">
              <Coins className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="text-xs text-yellow-300">Créditos</p>
                <p className="text-2xl font-bold text-yellow-100">{credits}</p>
              </div>
            </div>
            
            {lastWin > 0 && (
              <div className="flex items-center gap-2 bg-green-900/50 px-4 py-2 rounded-lg border-2 border-green-600 animate-pulse">
                <Trophy className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-xs text-green-300">Ganhou</p>
                  <p className="text-2xl font-bold text-green-100">+{lastWin}</p>
                </div>
              </div>
            )}
          </div>

          {/* Slots */}
          <div className="bg-gradient-to-b from-yellow-950 to-amber-950 rounded-2xl p-6 md:p-8 mb-6 border-4 border-yellow-700 shadow-inner">
            <div className="grid grid-cols-3 gap-4 md:gap-6 mb-4">
              {slots.map((symbol, index) => (
                <div
                  key={index}
                  className={`
                    aspect-square bg-gradient-to-br from-yellow-100 to-amber-200 
                    rounded-2xl flex items-center justify-center text-6xl md:text-8xl
                    border-4 border-yellow-600 shadow-2xl
                    ${isSpinning ? 'animate-spin' : 'animate-bounce'}
                  `}
                  style={{
                    animationDuration: isSpinning ? '0.1s' : '2s',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {symbol}
                </div>
              ))}
            </div>

            {/* Mensagem */}
            <div className="text-center">
              <p className={`
                text-xl md:text-2xl font-bold
                ${lastWin > 0 ? 'text-green-300' : 'text-yellow-200'}
              `}>
                {message}
              </p>
            </div>
          </div>

          {/* Botões */}
          <div className="space-y-4">
            <Button
              onClick={spin}
              disabled={credits < 10 || isSpinning}
              className="w-full h-16 text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
            >
              {isSpinning ? (
                <span className="flex items-center gap-2">
                  <Zap className="w-6 h-6 animate-pulse" />
                  GIRANDO...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Zap className="w-6 h-6" />
                  JOGAR (10 créditos)
                </span>
              )}
            </Button>

            {credits < 100 && (
              <Button
                onClick={addCredits}
                variant="outline"
                className="w-full h-12 text-lg font-semibold border-2 border-yellow-600 bg-yellow-900/30 hover:bg-yellow-800/50 text-yellow-100"
              >
                <Coins className="w-5 h-5 mr-2" />
                Adicionar 500 Créditos
              </Button>
            )}
          </div>

          {/* Tabela de Prêmios */}
          <div className="mt-6 bg-amber-950/50 rounded-lg p-4 border-2 border-yellow-700">
            <h3 className="text-yellow-300 font-bold mb-3 text-center">💰 Tabela de Prêmios</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-yellow-100">
                <span>🦁 🦁 🦁</span>
                <span className="font-bold text-yellow-300">500 créditos</span>
              </div>
              <div className="flex justify-between text-yellow-100">
                <span>💎 💎 💎</span>
                <span className="font-bold">300 créditos</span>
              </div>
              <div className="flex justify-between text-yellow-100">
                <span>👑 👑 👑</span>
                <span className="font-bold">200 créditos</span>
              </div>
              <div className="flex justify-between text-yellow-100">
                <span>Outros 3 iguais</span>
                <span className="font-bold">100 créditos</span>
              </div>
              <div className="flex justify-between text-yellow-100">
                <span>2 iguais</span>
                <span className="font-bold">20 créditos</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-yellow-200 mt-6 text-sm">
          🎰 Jogue com responsabilidade • Apenas para diversão
        </p>
      </div>
    </div>
  )
}
