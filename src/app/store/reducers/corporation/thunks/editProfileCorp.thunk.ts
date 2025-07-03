import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCorporation } from '../corporation.slice';
import { setAlertApp, setloading } from '../../configApp/configApp.slice';
import api from '@/app/api/axios_HTTP';
import { setUser } from '../../auth/auth.slice';

const editProfileCorp = createAsyncThunk(
    'editProfileCorp',
    async (data: { corp: Partial<TCorporation>; id: string }, { dispatch }) => {
        try {
            dispatch(setloading(true));
            const { profile, ...corporation } = data.corp;
            await api.doPatch(`/corporations/${corporation.id}`, corporation);

            const foundCorpProfile = await api.doGet(`/corporation-profile/corp/${corporation.id}`);

            if (foundCorpProfile.status === 404) {
                const newProfile = {
                    ...profile,
                    corpID: corporation.id,
                };
                const proCreated = await api.doPost('/corporation-profile', newProfile);
                if (!proCreated.affected) {
                    throw new Error('Erro ao criar o perfil');
                }
            } else {
                const pro = await api.doPatch(
                    `/corporation-profile/${foundCorpProfile.id}`,
                    profile,
                );
                if (!pro.affected) {
                    throw new Error('Erro ao atualizar o perfil');
                }
            }
            const foundCorpProfileAtt = await api.doGet(
                `/corporation-profile/corp/${corporation.id}`,
            );
            const attUser = await api.doGet(`/users/${data.id}`);
            console.log('user', attUser);
            if (attUser && foundCorpProfileAtt) {
                dispatch(
                    setUser({
                        ...attUser,
                        corp: { ...attUser.corp, profile: foundCorpProfileAtt },
                    }),
                );
                dispatch(setAlertApp({ message: 'Perfil atualizado', type: 'success' }));
                dispatch(setloading(false));
            }
        } catch (err) {
            console.log(err);
            const message = err instanceof Error ? err.message : 'Erro ao atualizar o perfil';
            dispatch(setAlertApp({ message, type: 'error' }));
            dispatch(setloading(false));
        }
    },
);

export default editProfileCorp;
