import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './style.css'


const Home: React.FC = () => {

  const history = useNavigate();

  function viewTask() {
    history('/tarefas')
  }

  return (
    <div className='home'>
      <div className='home-main'>
        <h1 className='home-title'>DO TASK</h1>
        <span className='home-subtitle'>SEU GERENCIADOR DE TAREFAS SIMPLES E MODERNO</span>
        <Button variant="warning" size="lg" onClick={viewTask}>ACESSE SUAS TAREFAS</Button>
      </div>
      <div className='home-help'>
        <div>
          <h2>COMO ORGANIZAR MINHAS TAREFAS? 📝</h2>
          <hr />
        </div>
        <div className='help-post'>
          <h3> ✔️ DEFINA SUAS PRIORIDADES</h3>
          <p>Uma dica é avaliar três aspectos: Impacto Negativo, Senso de Urgência e Tendência de Piorar</p>
        </div>
        <div className='help-post'>
          <h3> ✔️ ESTABELEÇA PRAZOS E RESPONSÁVEIS</h3>
          <p>Marque todos envolvidos na tarefa, alinhando suas responsabilidades e datas de entrega</p>
        </div>
        <div className='help-post'>
          <h3> ✔️ TENHA UMA ROTINA DE EXECUÇÃO</h3>
          <p>Adote o hábito de manter atualizadas todas suas tarefas</p>
        </div>
        <div className='help-post'>
          <h3> ✔️ ESCREVA UMA DESCRIÇÃO CLARA</h3>
          <p>Busque explicar cada ação necessária para realizar a tarefa, assim manterá o foco durante a execução</p>
        </div>
      </div>
    </div >
  )
}

export default Home;