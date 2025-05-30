import { Home, Search, Message } from '@mui/icons-material';

const LinkMeTurNavigationP = [
    {
        segment: 'dashboard',
        title: 'Home',
        icon: <Home />,
    },
    {
        segment: 'myServices',
        title: 'Meus Serviços',
        icon: <Search />,
        children: [
            {
                segment: 'registerService',
                title: 'Cadastrar Serviço',
                icon: <Search />,
            },
        ],
    },
    // {
    //     segment: 'dashboard',
    //     title: 'Minhas Propostas',
    // },
    {
        segment: 'messages',
        title: 'Mensagens',
        icon: <Message />,
    },
    // {
    //     segment: 'dashboard',
    //     title: 'Favoritos',
    // },
    // {
    //     segment: 'dashboard',
    //     title: 'Suporte',
    //     icon: <SupportAgent />,
    // },
];
const LinkMeTurNavigationT = [
    {
        segment: 'dashboard',
        title: 'Home',
        icon: <Home />,
    },
    {
        segment: 'myServices',
        title: 'Meus Serviços',
        icon: <Search />,
        children: [
            {
                segment: 'registerService',
                title: 'Cadastrar Serviço',
                icon: <Search />,
            },
        ],
    },
    // {
    //     segment: 'dashboard',
    //     title: 'Minhas Propostas',
    // },
    {
        segment: 'messages',
        title: 'Mensagens',
        icon: <Message />,
    },
    // {
    //     segment: 'dashboard',
    //     title: 'Favoritos',
    // },
    // {
    //     segment: 'dashboard',
    //     title: 'Suporte',
    //     icon: <SupportAgent />,
    // },
];

export { LinkMeTurNavigationT, LinkMeTurNavigationP };
