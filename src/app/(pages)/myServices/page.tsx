export default function MyServices() {
    return (
        <div id='dashboard-wrapper'>
            {/* 
  <!-- Main Content --> */}
            <div id='main-content'>
                {/* <!-- Search Content --> */}
                <div id='search-content' className='p-6'>
                    {/* <!-- Search Filters --> */}
                    <section id='search-filters' className='mb-6'>
                        <div className='bg-white rounded-lg shadow p-5'>
                            <h2 className='text-lg font-semibold text-gray-800 mb-4'>
                                Filtros de Busca
                            </h2>

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                                {/* <!-- Service Type Filter --> */}
                                <div id='filter-service-type'>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                                        Tipo de Serviço
                                    </label>
                                    <div className='relative'>
                                        <select className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md'>
                                            <option value=''>Todos os serviços</option>
                                            <option value='marketing'>Marketing</option>
                                            <option value='tecnologia'>Tecnologia</option>
                                            <option value='consultoria'>Consultoria</option>
                                            <option value='juridico'>Jurídico</option>
                                            <option value='contabil'>Contábil</option>
                                            <option value='treinamentos'>Treinamentos</option>
                                            <option value='sustentabilidade'>
                                                Sustentabilidade
                                            </option>
                                        </select>
                                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                                            <i className='fa-solid fa-chevron-down text-xs'></i>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Location Filter --> */}
                                <div id='filter-location'>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                                        Localização
                                    </label>
                                    <div className='relative'>
                                        <input
                                            type='text'
                                            placeholder='Digite uma cidade ou estado'
                                            className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md'
                                        />
                                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                                            <i className='fa-solid fa-location-dot'></i>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Price Range Filter --> */}
                                <div id='filter-price'>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                                        Faixa de Preço
                                    </label>
                                    <div className='relative'>
                                        <select className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md'>
                                            <option value=''>Qualquer preço</option>
                                            <option value='0-1000'>Até R$ 1.000</option>
                                            <option value='1000-3000'>R$ 1.000 - R$ 3.000</option>
                                            <option value='3000-5000'>R$ 3.000 - R$ 5.000</option>
                                            <option value='5000+'>Acima de R$ 5.000</option>
                                        </select>
                                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                                            <i className='fa-solid fa-chevron-down text-xs'></i>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Rating Filter --> */}
                                <div id='filter-rating'>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                                        Avaliação Mínima
                                    </label>
                                    <div className='relative'>
                                        <select className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md'>
                                            <option value=''>Qualquer avaliação</option>
                                            <option value='5'>5 estrelas</option>
                                            <option value='4'>4+ estrelas</option>
                                            <option value='3'>3+ estrelas</option>
                                        </select>
                                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                                            <i className='fa-solid fa-chevron-down text-xs'></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center mt-5 space-x-4'>
                                <button
                                    id='btn-search'
                                    className='bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md flex items-center'
                                >
                                    <i className='fa-solid fa-magnifying-glass mr-2'></i>
                                    Buscar
                                </button>

                                <button
                                    id='btn-clear-filters'
                                    className='text-gray-600 hover:text-gray-800 font-medium py-2 px-4 border border-gray-300 rounded-md flex items-center'
                                >
                                    <i className='fa-solid fa-xmark mr-2'></i>
                                    Limpar Filtros
                                </button>

                                <div className='ml-auto flex items-center space-x-4'>
                                    <button
                                        id='toggle-view-list'
                                        className='text-emerald-600 hover:text-emerald-700 p-1.5 rounded-md border border-emerald-600'
                                    >
                                        <i className='fa-solid fa-list text-lg'></i>
                                    </button>

                                    <button
                                        id='toggle-view-map'
                                        className='text-gray-600 hover:text-gray-800 p-1.5 rounded-md border border-gray-300'
                                    >
                                        <i className='fa-solid fa-map-location-dot text-lg'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <!-- Search Results --> */}
                    <div className='flex flex-col lg:flex-row gap-6'>
                        {/* <!-- Results List --> */}
                        <section id='search-results' className='lg:w-2/3'>
                            <div className='flex items-center justify-between mb-4'>
                                <h2 className='text-lg font-semibold text-gray-800'>
                                    Resultados (15)
                                </h2>

                                <div className='flex items-center'>
                                    <span className='text-sm text-gray-600 mr-2'>Ordenar por:</span>
                                    <select className='text-sm border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'>
                                        <option value='relevance'>Relevância</option>
                                        <option value='rating'>Avaliação</option>
                                        <option value='price-asc'>Preço: menor para maior</option>
                                        <option value='price-desc'>Preço: maior para menor</option>
                                    </select>
                                </div>
                            </div>

                            <div className='space-y-4'>
                                {/* <!-- Result Card 1 --> */}
                                <div
                                    id='result-card-1'
                                    className='bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition'
                                >
                                    <div className='flex flex-col md:flex-row'>
                                        <div className='md:w-1/3 h-48 md:h-auto bg-gray-200 relative'>
                                            <img
                                                className='w-full h-full object-cover'
                                                src='https://storage.googleapis.com/uxpilot-auth.appspot.com/35cdc99b4e-81ebe374d136c68e8a8b.png'
                                                alt='Marketing digital para empresas de turismo'
                                            />
                                            <div className='absolute top-2 right-2 bg-amber-400 text-white text-xs font-medium px-2 py-1 rounded'>
                                                <i className='fa-solid fa-star mr-1'></i> 4.9
                                            </div>
                                        </div>
                                        <div className='p-4 md:w-2/3 flex flex-col'>
                                            <div className='flex items-center space-x-2 mb-2'>
                                                <span className='bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded'>
                                                    Marketing
                                                </span>
                                                <span className='bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded'>
                                                    Marketing Digital
                                                </span>
                                            </div>
                                            <h3 className='font-medium text-gray-900 mb-1'>
                                                Estratégia Completa de Marketing Digital
                                            </h3>
                                            <p className='text-sm text-gray-500 mb-3'>
                                                Desenvolvemos estratégias completas de marketing
                                                digital para empresas de turismo, incluindo gestão
                                                de redes sociais, SEO, campanhas de anúncios e
                                                análise de resultados.
                                            </p>

                                            <div className='mt-auto flex items-center justify-between'>
                                                <div>
                                                    <p className='font-semibold text-gray-900'>
                                                        R$ 2.500,00{' '}
                                                        <span className='text-sm font-normal text-gray-500'>
                                                            /mês
                                                        </span>
                                                    </p>
                                                    <div className='flex items-center mt-1'>
                                                        <div className='flex text-amber-400 text-xs'>
                                                            <i className='fa-solid fa-star'></i>
                                                            <i className='fa-solid fa-star'></i>
                                                            <i className='fa-solid fa-star'></i>
                                                            <i className='fa-solid fa-star'></i>
                                                            <i className='fa-solid fa-star'></i>
                                                        </div>
                                                        <span className='text-xs text-gray-500 ml-1'>
                                                            (42 avaliações)
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className='flex items-center space-x-2'>
                                                    <button className='text-gray-400 hover:text-red-500'>
                                                        <i className='fa-regular fa-heart text-lg'></i>
                                                    </button>
                                                    <button className='bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md'>
                                                        Ver detalhes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Result Card 2 --> */}
                                <div
                                    id='result-card-2'
                                    className='bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition'
                                >
                                    <div className='flex flex-col md:flex-row'>
                                        <div className='md:w-1/3 h-48 md:h-auto bg-gray-200 relative'>
                                            <img
                                                className='w-full h-full object-cover'
                                                src='https://storage.googleapis.com/uxpilot-auth.appspot.com/dff1550b98-a5524f5bbdb10863c6ff.png'
                                                alt='Desenvolvimento de website para empresas de turismo'
                                            />
                                            <div className='absolute top-2 right-2 bg-amber-400 text-white text-xs font-medium px-2 py-1 rounded'>
                                                <i className='fa-solid fa-star mr-1'></i> 4.7
                                            </div>
                                        </div>
                                        <div className='p-4 md:w-2/3 flex flex-col'>
                                            <div className='flex items-center space-x-2 mb-2'>
                                                <span className='bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded'>
                                                    Tecnologia
                                                </span>
                                                <span className='bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded'>
                                                    Desenvolvimento Web
                                                </span>
                                            </div>
                                            <h3 className='font-medium text-gray-900 mb-1'>
                                                Website Responsivo com Sistema de Reservas
                                            </h3>
                                            <p className='text-sm text-gray-500 mb-3'>
                                                Criação de websites modernos e otimizados para
                                                empresas de turismo, com sistema integrado de
                                                reservas, galeria de fotos e integração com redes
                                                sociais.
                                            </p>

                                            <div className='mt-auto flex items-center justify-between'>
                                                <div>
                                                    <p className='font-semibold text-gray-900'>
                                                        R$ 4.800,00
                                                    </p>
                                                    <div className='flex items-center mt-1'>
                                                        <div className='flex text-amber-400 text-xs'>
                                                            <i className='fa-solid fa-star'></i>
                                                            <i className='fa-solid fa-star'></i>
                                                            <i className='fa-solid fa-star'></i>
                                                            <i className='fa-solid fa-star'></i>
                                                            <i className='fa-solid fa-star-half-stroke'></i>
                                                        </div>
                                                        <span className='text-xs text-gray-500 ml-1'>
                                                            (36 avaliações)
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className='flex items-center space-x-2'>
                                                    <button className='text-gray-400 hover:text-red-500'>
                                                        <i className='fa-regular fa-heart text-lg'></i>
                                                    </button>
                                                    <button className='bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md'>
                                                        Ver detalhes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Result Card 3 --> */}
                                <div
                                    id='result-card-3'
                                    className='bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition'
                                >
                                    <div className='flex flex-col md:flex-row'>
                                        <div className='md:w-1/3 h-48 md:h-auto bg-gray-200 relative'>
                                            <img
                                                className='w-full h-full object-cover'
                                                src='https://storage.googleapis.com/uxpilot-auth.appspot.com/561b354efa-8b7095e7bb60b99096ff.png'
                                                alt='Consultoria em sustentabilidade para turismo'
                                            />
                                            <div className='absolute top-2 right-2 bg-amber-400 text-white text-xs font-medium px-2 py-1 rounded'>
                                                <i className='fa-solid fa-star mr-1'></i> 4.8
                                            </div>
                                        </div>
                                        <div className='p-4 md:w-2/3 flex flex-col'>
                                            <div className='flex items-center space-x-2 mb-2'>
                                                <span className='bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded'>
                                                    Sustentabilidade
                                                </span>
                                                <span className='bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded'>
                                                    Certificação
                                                </span>
                                            </div>
                                            <h3 className='font-medium text-gray-900 mb-1'>
                                                Consultoria em Turismo Sustentável
                                            </h3>
                                            <p className='text-sm text-gray-500 mb-3'>
                                                Assessoria para implementação de práticas
                                                sustentáveis em empresas de turismo, preparação para
                                                certificações ambientais e desenvolvimento de
                                                programas de responsabilidade social.
                                            </p>

                                            <div className='mt-auto flex items-center justify-between'>
                                                <div>
                                                    <p className='font-semibold text-gray-900'>
                                                        R$ 3.200,00
                                                    </p>
                                                    <div className='flex items-center mt-1'>
                                                        <div className='flex text-amber-400 text-xs'>
                                                            <i className='fa-solid fa-star'></i>
                                                            <i className='fa-solid fa-star'></i>
                                                            <i className='fa-solid fa-star'></i>
                                                            <i className='fa-solid fa-star'></i>
                                                            <i className='fa-solid fa-star'></i>
                                                        </div>
                                                        <span className='text-xs text-gray-500 ml-1'>
                                                            (28 avaliações)
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className='flex items-center space-x-2'>
                                                    <button className='text-gray-400 hover:text-red-500'>
                                                        <i className='fa-regular fa-heart text-lg'></i>
                                                    </button>
                                                    <button className='bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md'>
                                                        Ver detalhes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Pagination --> */}
                                <div
                                    id='pagination'
                                    className='flex items-center justify-center mt-6'
                                >
                                    <nav className='flex items-center space-x-1'>
                                        <button className='px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100'>
                                            <i className='fa-solid fa-chevron-left text-xs'></i>
                                        </button>
                                        <button className='px-3 py-1 rounded-md bg-emerald-600 text-white'>
                                            1
                                        </button>
                                        <button className='px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100'>
                                            2
                                        </button>
                                        <button className='px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100'>
                                            3
                                        </button>
                                        <button className='px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100'>
                                            ...
                                        </button>
                                        <button className='px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100'>
                                            8
                                        </button>
                                        <button className='px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100'>
                                            <i className='fa-solid fa-chevron-right text-xs'></i>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </section>

                        {/* <!-- Map View --> */}
                        <section id='map-view' className='lg:w-1/3'>
                            <div className='bg-white rounded-lg shadow overflow-hidden'>
                                <div className='p-4 border-b border-gray-200'>
                                    <h2 className='text-lg font-semibold text-gray-800'>
                                        Mapa de Prestadores
                                    </h2>
                                </div>
                                <div className='h-[600px] bg-gray-100 relative'>
                                    <img
                                        className='w-full h-full object-cover'
                                        src='https://storage.googleapis.com/uxpilot-auth.appspot.com/8e8f0510b8-4b920496ba5bfdf1190c.png'
                                        alt='map showing service providers for tourism businesses in Brazil, with pins and markers showing different service categories, professional quality map view'
                                    />

                                    {/* <!-- Map Controls --> */}
                                    <div className='absolute top-4 right-4 bg-white rounded-lg shadow p-2'>
                                        <div className='flex flex-col space-y-2'>
                                            <button className='h-8 w-8 flex items-center justify-center text-gray-600 hover:text-gray-900 bg-white rounded-md border border-gray-300'>
                                                <i className='fa-solid fa-plus'></i>
                                            </button>
                                            <button className='h-8 w-8 flex items-center justify-center text-gray-600 hover:text-gray-900 bg-white rounded-md border border-gray-300'>
                                                <i className='fa-solid fa-minus'></i>
                                            </button>
                                            <button className='h-8 w-8 flex items-center justify-center text-gray-600 hover:text-gray-900 bg-white rounded-md border border-gray-300'>
                                                <i className='fa-solid fa-location-crosshairs'></i>
                                            </button>
                                        </div>
                                    </div>

                                    {/* <!-- Map Legend --> */}
                                    <div className='absolute bottom-4 left-4 bg-white rounded-lg shadow p-3'>
                                        <p className='text-sm font-medium text-gray-800 mb-2'>
                                            Categorias
                                        </p>
                                        <div className='space-y-1.5'>
                                            <div className='flex items-center'>
                                                <span className='h-3 w-3 rounded-full bg-blue-500 mr-2'></span>
                                                <span className='text-xs text-gray-600'>
                                                    Marketing
                                                </span>
                                            </div>
                                            <div className='flex items-center'>
                                                <span className='h-3 w-3 rounded-full bg-indigo-500 mr-2'></span>
                                                <span className='text-xs text-gray-600'>
                                                    Tecnologia
                                                </span>
                                            </div>
                                            <div className='flex items-center'>
                                                <span className='h-3 w-3 rounded-full bg-rose-500 mr-2'></span>
                                                <span className='text-xs text-gray-600'>
                                                    Consultoria
                                                </span>
                                            </div>
                                            <div className='flex items-center'>
                                                <span className='h-3 w-3 rounded-full bg-green-500 mr-2'></span>
                                                <span className='text-xs text-gray-600'>
                                                    Sustentabilidade
                                                </span>
                                            </div>
                                            <div className='flex items-center'>
                                                <span className='h-3 w-3 rounded-full bg-amber-500 mr-2'></span>
                                                <span className='text-xs text-gray-600'>
                                                    Outros
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Map Popup --> */}
                                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 w-64'>
                                        <div className='flex items-start'>
                                            <img
                                                src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
                                                alt='Prestador'
                                                className='w-12 h-12 rounded-full mr-3'
                                            />
                                            <div className='flex-1'>
                                                <h3 className='font-medium text-gray-900 text-sm'>
                                                    Carlos Oliveira
                                                </h3>
                                                <p className='text-xs text-gray-500'>
                                                    Marketing Digital
                                                </p>
                                                <div className='flex text-amber-400 text-xs mt-1'>
                                                    <i className='fa-solid fa-star'></i>
                                                    <i className='fa-solid fa-star'></i>
                                                    <i className='fa-solid fa-star'></i>
                                                    <i className='fa-solid fa-star'></i>
                                                    <i className='fa-solid fa-star'></i>
                                                    <span className='text-gray-500 ml-1'>4.9</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-2 pt-2 border-t border-gray-100'>
                                            <button className='w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium py-1.5 px-3 rounded-md'>
                                                Ver detalhes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
