'user client';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { TUser } from '@/app/store/reducers/user/user.slice';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    TextField,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { sendFileS3 } from '@/app/api/awsS3';
import updateUser from '@/app/store/reducers/user/thunks/updateUser.thunk';
import createUser from '@/app/store/reducers/user/thunks/createUser.thunk';
import { formatPhone } from '@/app/config/functions/formatPhone';
import { cleanCaracters } from '@/app/config/functions/cleanCaracters';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface IModalUser {
    open: boolean;
    onClose: () => void;
    user?: TUser;
    mode: 'edit' | 'new';
}
export default function ModalUserEditOrCreate({ open, onClose, user, mode }: IModalUser) {
    const dispatch = useAppDispatch();
    const { usuario } = useAppSelector((state) => state.auth);
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [nivel, setNivel] = useState<number>(0);
    const [trocarSenha, setTrocarSenha] = useState<boolean>(false);
    const [visibility, setVisibility] = useState<boolean>(false);

    useEffect(() => {
        if (user && mode === 'edit') {
            setNome(user.nome ?? '');
            setEmail(user.email ?? '');
            setTelefone(user.telefone ?? '');
            setAvatar(user.avatar_url ?? '');
            setNivel(user.nivel ?? 0);
        } else if (mode === 'new') {
            setNome('');
            setEmail('');
            setTelefone('');
            setAvatar('');
            setNivel(0);
        }
    }, [mode, user]);

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const newAvatar = await sendFileS3('avatar_user', file);
        if (newAvatar) {
            setAvatar(newAvatar.file_URL);
        }
    };
    const handleSave = () => {
        if (mode === 'new') {
            const userNew: Partial<TUser & Record<'senha', string>> = {
                nome,
                email,
                telefone,
                nivel,
                avatar_url: avatar,
                senha: password,
                corpId: user?.corpId as string,
            };
            dispatch(createUser({ user: userNew, id: usuario?.id as string }))
                .unwrap()
                .then(() => onClose());
        } else if (mode === 'edit') {
            // eslint-disable-next-line prefer-const
            let userEdit: Partial<TUser & Record<'senha', string>> = {};
            userEdit.id = user?.id;
            if (nome !== user?.nome) userEdit.nome = nome;
            if (email !== user?.email) userEdit.email = email;
            if (telefone !== user?.telefone) userEdit.telefone = telefone;
            if (nivel !== user?.nivel) userEdit.nivel = nivel;
            if (avatar !== user?.avatar_url) userEdit.avatar_url = avatar;
            if (password && password !== confirmPassword) userEdit.senha = password;
            dispatch(updateUser({ user: userEdit, id: usuario?.id as string }))
                .unwrap()
                .then(() => onClose());
        }
    };
    return (
        <Modal
            open={open}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper sx={{ margin: 'auto', width: '30rem' }}>
                <Card>
                    <CardMedia
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '5rem',
                        }}
                        className='bg-emerald-600'
                    >
                        <Avatar
                            src={avatar}
                            sx={{ width: 60, height: 60, border: 'whitesmoke 2px solid' }}
                        />
                        <input
                            type='file'
                            accept='image/*'
                            multiple
                            value={''}
                            onChange={handleAvatarUpload}
                            style={{
                                display: 'none',
                            }}
                            id='upload-avatar'
                        />
                        <label htmlFor='upload-avatar'>
                            <IconButton
                                component='span'
                                size='small'
                                sx={{
                                    backgroundColor: 'whitesmoke',
                                    top: '0.5rem',
                                    right: '12.5rem',
                                    position: 'absolute',
                                    fontSize: '15px',
                                }}
                                color='success'
                            >
                                <MdAddPhotoAlternate />
                            </IconButton>
                        </label>
                    </CardMedia>
                    <CardContent>
                        <TextField
                            label='Nome'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            fullWidth
                            size='small'
                            margin='dense'
                        />
                        <TextField
                            label='Email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            size='small'
                            margin='dense'
                        />
                        <TextField
                            label='Telefone'
                            value={telefone ? formatPhone(telefone) : ''}
                            onChange={(e) => setTelefone(cleanCaracters(e.target.value))}
                            fullWidth
                            size='small'
                            margin='dense'
                        />
                        <FormControl>
                            <InputLabel id='user-nivel'>Nível</InputLabel>
                            <Select
                                labelId='user-nivel'
                                label='Nível'
                                value={nivel}
                                onChange={(e) => setNivel(Number(e.target.value))}
                                fullWidth
                                size='small'
                                margin='dense'
                            >
                                <MenuItem value={0}>Nenhum</MenuItem>
                                <MenuItem value={1}>Admin</MenuItem>
                                <MenuItem value={2}>Planner</MenuItem>
                                <MenuItem value={3}>Consultor</MenuItem>
                            </Select>
                        </FormControl>
                        {usuario.nivel === 1 && mode === 'new' ? (
                            <Fragment>
                                <TextField
                                    label='Senha'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    size='small'
                                    margin='dense'
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <IconButton
                                                    onClick={() => setVisibility(!visibility)}
                                                >
                                                    {!visibility ? <FaEye /> : <FaEyeSlash />}
                                                </IconButton>
                                            ),
                                        },
                                    }}
                                    type={visibility ? 'text' : 'password'}
                                />
                                <TextField
                                    label='Confirmar Senha'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    fullWidth
                                    size='small'
                                    margin='dense'
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <IconButton
                                                    onClick={() => setVisibility(!visibility)}
                                                >
                                                    {!visibility ? <FaEye /> : <FaEyeSlash />}
                                                </IconButton>
                                            ),
                                        },
                                    }}
                                    type={visibility ? 'text' : 'password'}
                                />
                            </Fragment>
                        ) : (
                            <Fragment>
                                {!trocarSenha ? (
                                    <Button color='info' onClick={() => setTrocarSenha(true)}>
                                        Mudar senha
                                    </Button>
                                ) : (
                                    <Fragment>
                                        <TextField
                                            label='Nova Senha'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            fullWidth
                                            size='small'
                                            margin='dense'
                                            slotProps={{
                                                input: {
                                                    endAdornment: (
                                                        <IconButton
                                                            onClick={() =>
                                                                setVisibility(!visibility)
                                                            }
                                                        >
                                                            {!visibility ? (
                                                                <FaEye />
                                                            ) : (
                                                                <FaEyeSlash />
                                                            )}
                                                        </IconButton>
                                                    ),
                                                },
                                            }}
                                            type={visibility ? 'text' : 'password'}
                                        />
                                        <TextField
                                            label='Confirmar Senha'
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            fullWidth
                                            size='small'
                                            margin='dense'
                                            slotProps={{
                                                input: {
                                                    endAdornment: (
                                                        <IconButton
                                                            onClick={() =>
                                                                setVisibility(!visibility)
                                                            }
                                                        >
                                                            {!visibility ? (
                                                                <FaEye />
                                                            ) : (
                                                                <FaEyeSlash />
                                                            )}
                                                        </IconButton>
                                                    ),
                                                },
                                            }}
                                            type={visibility ? 'text' : 'password'}
                                        />
                                    </Fragment>
                                )}
                            </Fragment>
                        )}
                    </CardContent>
                    <CardActions className='flex items-center justify-between'>
                        <Button onClick={onClose}>Cancelar</Button>

                        <Button onClick={handleSave}>{mode === 'edit' ? 'Salvar' : 'Criar'}</Button>
                    </CardActions>
                </Card>
            </Paper>
        </Modal>
    );
}
