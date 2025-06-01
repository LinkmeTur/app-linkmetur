import { MdHomeWork, MdDesignServices, MdMessage, MdSupportAgent } from 'react-icons/md';
import { RiAuctionFill, RiAccountBoxLine, RiSearchEyeLine } from 'react-icons/ri';
import { GiRocketThruster, GiReceiveMoney, GiArchiveRegister } from 'react-icons/gi';
import { VscSettingsGear } from 'react-icons/vsc';

const LinkMeTurNavigationT = [
    {
        segment: 'dashboard',
        title: 'Home',
        icon: <MdHomeWork />,
    },
    {
        segment: 'profile',
        title: 'Perfil',
        icon: <RiAccountBoxLine />,
    },

    {
        title: 'Serviços',
        icon: <MdDesignServices />,
        children: [
            {
                segment: 'myServices',
                title: 'Buscar serviços',
                icon: <RiSearchEyeLine />,
            },
        ],
    },
    {
        title: 'Solicitações de pedidos',
        icon: <GiReceiveMoney />,
        children: [
            {
                segment: 'rfp',
                title: 'Minhas Solicitaçoes',
                icon: <RiSearchEyeLine />,
            },
            {
                segment: 'rfp/proposal',
                title: 'Propostas Recebidas',
                icon: <GiRocketThruster />,
            },
            {
                segment: 'rfp/requests',
                title: 'Pedidos Feitos',
                icon: <RiAuctionFill />,
            },
        ],
    },

    {
        segment: 'messages',
        title: 'Mensagens',
        icon: <MdMessage />,
    },

    {
        segment: 'settings',
        title: 'Configurações',
        icon: <VscSettingsGear />,
    },
    {
        segment: 'support',
        title: 'Suporte',
        icon: <MdSupportAgent />,
    },
];
const LinkMeTurNavigationP = [
    {
        segment: 'dashboard',
        title: 'Home',
        icon: <MdHomeWork />,
    },
    {
        segment: 'profile',
        title: 'Perfil',
        icon: <RiAccountBoxLine />,
    },
    {
        title: 'Solicitações de pedidos',
        icon: <GiReceiveMoney />,
        children: [
            {
                segment: 'rfp',
                title: 'Buscar Solicitaçoes',
                icon: <RiSearchEyeLine />,
            },
            {
                segment: 'rfp/proposal',
                title: 'Minhas Propostas',
                icon: <GiRocketThruster />,
            },
            {
                segment: 'rfp/requests',
                title: 'Pedidos',
                icon: <RiAuctionFill />,
            },
        ],
    },
    {
        title: 'Serviços',
        icon: <MdDesignServices />,
        children: [
            {
                segment: 'myServices',
                title: 'Meus Serviços',
                icon: <RiSearchEyeLine />,
            },
            {
                segment: 'myServices/registerService',
                title: 'Cadastrar Serviço',
                icon: <GiArchiveRegister />,
            },
        ],
    },
    {
        segment: 'messages',
        title: 'Mensagens',
        icon: <MdMessage />,
    },

    {
        segment: 'settings',
        title: 'Configurações',
        icon: <VscSettingsGear />,
    },
    {
        segment: 'support',
        title: 'Suporte',
        icon: <MdSupportAgent />,
    },
];

export { LinkMeTurNavigationT, LinkMeTurNavigationP };
