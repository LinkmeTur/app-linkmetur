'use client';
export default function Dashboard() {
    return (
        <div id='dashboard-content' className='p-6'>
            <section id='key-metrics' className='mb-8'>
                <h2 className='text-lg font-semibold text-gray-800 mb-4'>Métricas-chave</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div id='metric-profile-views' className='bg-white rounded-lg shadow p-5'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-500'>
                                    Visualizações do Perfil
                                </p>
                                <p className='text-2xl font-bold text-gray-800'>248</p>
                            </div>
                            <div className='h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500'>
                                <i className='fa-solid fa-eye text-xl'></i>
                            </div>
                        </div>
                        <div className='mt-2 flex items-center text-xs'>
                            <span className='text-green-500 font-medium flex items-center'>
                                <i className='fa-solid fa-arrow-up mr-1'></i> 12.5%
                            </span>
                            <span className='text-gray-500 ml-1'>desde o último mês</span>
                        </div>
                    </div>

                    <div id='metric-proposals' className='bg-white rounded-lg shadow p-5'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-500'>
                                    Propostas Recebidas
                                </p>
                                <p className='text-2xl font-bold text-gray-800'>32</p>
                            </div>
                            <div className='h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500'>
                                <i className='fa-solid fa-file-contract text-xl'></i>
                            </div>
                        </div>
                        <div className='mt-2 flex items-center text-xs'>
                            <span className='text-green-500 font-medium flex items-center'>
                                <i className='fa-solid fa-arrow-up mr-1'></i> 8.3%
                            </span>
                            <span className='text-gray-500 ml-1'>desde o último mês</span>
                        </div>
                    </div>

                    <div id='metric-conversion' className='bg-white rounded-lg shadow p-5'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-500'>Contatos</p>
                                <p className='text-2xl font-bold text-gray-800'>156</p>
                            </div>
                            <div className='h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500'>
                                <i className='fa-solid fa-address-book text-xl'></i>
                            </div>
                        </div>
                        <div className='mt-2 flex items-center text-xs'>
                            <span className='text-green-500 font-medium flex items-center'>
                                <i className='fa-solid fa-arrow-up mr-1'></i> 8.3%
                            </span>
                            <span className='text-gray-500 ml-1'>desde o último mês</span>
                        </div>
                    </div>

                    <div id='metric-rating' className='bg-white rounded-lg shadow p-5'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-500'>Avaliação Média</p>
                                <p className='text-2xl font-bold text-gray-800'>4.8</p>
                            </div>
                            <div className='h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-500'>
                                <i className='fa-solid fa-star text-xl'></i>
                            </div>
                        </div>
                        <div className='mt-2 flex items-center'>
                            <div className='flex text-amber-400 text-xs'>
                                <i className='fa-solid fa-star'></i>
                                <i className='fa-solid fa-star'></i>
                                <i className='fa-solid fa-star'></i>
                                <i className='fa-solid fa-star'></i>
                                <i className='fa-solid fa-star-half-stroke'></i>
                            </div>
                            <span className='text-gray-500 text-xs ml-1'>
                                baseado em 42 avaliações
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section id='quick-actions' className='mb-8'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-lg font-semibold text-gray-800'>Ações Rápidas</h2>

                    <button
                        id='btn-all-actions'
                        className='text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center'
                    >
                        Ver todas
                        <i className='fa-solid fa-chevron-right ml-1 text-xs'></i>
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div
                        id='action-new-service'
                        className='bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer'
                    >
                        <div className='flex items-center space-x-3'>
                            <div className='h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500'>
                                <i className='fa-solid fa-plus'></i>
                            </div>
                            <div>
                                <p className='font-medium text-gray-800'>Cadastrar Serviço</p>
                                <p className='text-xs text-gray-500'>Adicione um novo serviço</p>
                            </div>
                        </div>
                    </div>

                    <div
                        id='action-categories'
                        className='bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer'
                    >
                        <div className='flex items-center space-x-3'>
                            <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500'>
                                <i className='fa-solid fa-tag'></i>
                            </div>
                            <div>
                                <p className='font-medium text-gray-800'>Gerenciar Categorias</p>
                                <p className='text-xs text-gray-500'>
                                    Edite categorias e subcategorias
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        id='action-messages'
                        className='bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer'
                    >
                        <div className='flex items-center space-x-3'>
                            <div className='h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500'>
                                <i className='fa-solid fa-envelope'></i>
                            </div>
                            <div>
                                <p className='font-medium text-gray-800'>Ver Mensagens</p>
                                <p className='text-xs text-gray-500'>5 mensagens não lidas</p>
                            </div>
                        </div>
                    </div>

                    <div
                        id='action-edit-profile'
                        className='bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer'
                    >
                        <div className='flex items-center space-x-3'>
                            <div className='h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500'>
                                <i className='fa-solid fa-user-edit'></i>
                            </div>
                            <div>
                                <p className='font-medium text-gray-800'>Editar Perfil</p>
                                <p className='text-xs text-gray-500'>Atualize suas informações</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id='active-services' className='mb-8'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-lg font-semibold text-gray-800'>Serviços Ativos</h2>

                    <button
                        id='btn-all-services'
                        className='text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center'
                    >
                        Ver todos
                        <i className='fa-solid fa-chevron-right ml-1 text-xs'></i>
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    <div id='service-card-1' className='bg-white rounded-lg shadow overflow-hidden'>
                        <div className='h-40 bg-gray-200 relative'>
                            {/* <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/35cdc99b4e-81ebe374d136c68e8a8b.png" alt="a professional taking photos of a hotel, marketing service for tourism, professional quality"> */}
                            <div className='absolute top-2 right-2 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded'>
                                Disponível
                            </div>
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center space-x-2 mb-2'>
                                <span className='bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded'>
                                    Marketing
                                </span>
                                <span className='bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded'>
                                    Fotografia
                                </span>
                            </div>
                            <h3 className='font-medium text-gray-900 mb-1'>
                                Fotografia Profissional para Hotelaria
                            </h3>
                            <p className='text-sm text-gray-500 mb-3 line-clamp-2'>
                                Serviço de fotografia especializada para hotéis, pousadas e resorts.
                                Realce a beleza do seu estabelecimento.
                            </p>
                            <div className='flex items-center justify-between'>
                                <p className='font-semibold text-gray-900'>R$ 1.800,00</p>
                                <button className='text-emerald-600 hover:text-emerald-700 text-sm font-medium'>
                                    Detalhes
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id='service-card-2' className='bg-white rounded-lg shadow overflow-hidden'>
                        <div className='h-40 bg-gray-200 relative'>
                            {/* <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/dff1550b98-a5524f5bbdb10863c6ff.png" alt="a person working on a website design for a tourism company, web development, professional quality"> */}
                            <div className='absolute top-2 right-2 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded'>
                                Em negociação
                            </div>
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center space-x-2 mb-2'>
                                <span className='bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded'>
                                    Tecnologia
                                </span>
                                <span className='bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded'>
                                    Web Design
                                </span>
                            </div>
                            <h3 className='font-medium text-gray-900 mb-1'>
                                Desenvolvimento de Website Responsivo
                            </h3>
                            <p className='text-sm text-gray-500 mb-3 line-clamp-2'>
                                Criação de sites modernos e otimizados para dispositivos móveis, com
                                foco em conversão e experiência do usuário.
                            </p>
                            <div className='flex items-center justify-between'>
                                <p className='font-semibold text-gray-900'>R$ 4.500,00</p>
                                <button className='text-emerald-600 hover:text-emerald-700 text-sm font-medium'>
                                    Detalhes
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id='service-card-3' className='bg-white rounded-lg shadow overflow-hidden'>
                        <div className='h-40 bg-gray-200 relative'>
                            {/* <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/561b354efa-8b7095e7bb60b99096ff.png" alt="a business consultant meeting with tourism company owners, business consultation, professional setting"> */}
                            <div className='absolute top-2 right-2 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded'>
                                Disponível
                            </div>
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center space-x-2 mb-2'>
                                <span className='bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded'>
                                    Consultoria
                                </span>
                                <span className='bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded'>
                                    Estratégia
                                </span>
                            </div>
                            <h3 className='font-medium text-gray-900 mb-1'>
                                Consultoria em Gestão Turística
                            </h3>
                            <p className='text-sm text-gray-500 mb-3 line-clamp-2'>
                                Análise e implementação de estratégias para melhorar a eficiência
                                operacional e aumentar a rentabilidade do seu negócio.
                            </p>
                            <div className='flex items-center justify-between'>
                                <p className='font-semibold text-gray-900'>R$ 3.200,00</p>
                                <button className='text-emerald-600 hover:text-emerald-700 text-sm font-medium'>
                                    Detalhes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id='recent-notifications'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-lg font-semibold text-gray-800'>Notificações Recentes</h2>

                    <button
                        id='btn-all-notifications'
                        className='text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center'
                    >
                        Ver todas
                        <i className='fa-solid fa-chevron-right ml-1 text-xs'></i>
                    </button>
                </div>

                <div className='bg-white rounded-lg shadow overflow-hidden'>
                    <div
                        id='notification-1'
                        className='p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer'
                    >
                        <div className='flex items-start'>
                            <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0'>
                                <i className='fa-solid fa-file-contract'></i>
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm font-medium text-gray-900'>
                                    Nova proposta recebida
                                </p>
                                <p className='text-xs text-gray-500 mb-1'>
                                    Pousada Recanto Verde está interessada no seu serviço de
                                    fotografia
                                </p>
                                <p className='text-xs text-gray-400'>Hoje, 09:45</p>
                            </div>
                            <div className='ml-3'>
                                <span className='h-2 w-2 bg-blue-500 rounded-full block'></span>
                            </div>
                        </div>
                    </div>

                    <div
                        id='notification-2'
                        className='p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer'
                    >
                        <div className='flex items-start'>
                            <div className='h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mr-3 flex-shrink-0'>
                                <i className='fa-solid fa-envelope'></i>
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm font-medium text-gray-900'>Nova mensagem</p>
                                <p className='text-xs text-gray-500 mb-1'>
                                    João da Agência Aventuras enviou uma mensagem sobre seu serviço
                                </p>
                                <p className='text-xs text-gray-400'>Ontem, 15:32</p>
                            </div>
                            <div className='ml-3'>
                                <span className='h-2 w-2 bg-emerald-500 rounded-full block'></span>
                            </div>
                        </div>
                    </div>

                    <div
                        id='notification-3'
                        className='p-4 hover:bg-gray-50 transition cursor-pointer'
                    >
                        <div className='flex items-start'>
                            <div className='h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mr-3 flex-shrink-0'>
                                <i className='fa-solid fa-star'></i>
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm font-medium text-gray-900'>Nova avaliação</p>
                                <p className='text-xs text-gray-500 mb-1'>
                                    Hotel Montanha Azul avaliou seu serviço de consultoria com 5
                                    estrelas
                                </p>
                                <p className='text-xs text-gray-400'>2 dias atrás</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
