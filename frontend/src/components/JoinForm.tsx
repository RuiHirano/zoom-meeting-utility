import React, { useState } from "react";
import { Typography, Button, TextField, Paper } from '@mui/material'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import * as yup from "yup";

const InputField: React.FC<{ label: string, error?: string, value: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, error, value, onChange }) => {
    return (
        <div style={{ marginTop: 10, marginBottom: 10 }}>
            <div style={{ display: 'flex' }}>
                <Typography style={{ fontSize: 15, color: 'black', marginRight: 10 }}>
                    {label}
                </Typography>
                <TextField error={error ? true : false} InputProps={{ inputProps: { style: { textAlign: 'right' } } }} size="small" defaultValue={value} onChange={onChange} />
            </div>
        </div>
    );
}

export interface Props {
    onSubmit: (data: any) => void
}

export interface InputData {
    username: string
    meetingId: string
    password: string
}

export const defaultInputData: InputData = {
    username: 'ZoomTranscribeBot',
    meetingId: '',
    password: ''
}

const schema = yup.object({
    username: yup.string().required(),
    meetingId: yup.string().required(),
    password: yup.string().required()
}).required();

const JoinForm: React.FC<Props> = ({ onSubmit }) => {
    const [loading, setLoading] = React.useState<boolean>(false);

    const submit = async (data: any) => {
        setLoading(true)
        onSubmit(data)
        setLoading(false)
    }

    const { handleSubmit, setValue, getValues, formState: { errors } } = useForm<InputData>(
        { defaultValues: defaultInputData, resolver: yupResolver(schema) }
    );

    return (
        <Paper style={{ padding: 20 }}>
            {/*<InputField label="User Name" value={getValues("username")} error={errors.username?.message} onChange={(e) => { setValue("username", e.target.value) }} />*/}
            <InputField label="Meeting ID" value={getValues("meetingId")} error={errors.meetingId?.message} onChange={(e) => { setValue("meetingId", e.target.value) }} />
            <InputField label="Password" value={getValues("password")} error={errors.password?.message} onChange={(e) => { setValue("password", e.target.value) }} />
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LoadingButton loading={loading} size="large" style={{ fontWeight: 'bold' }} variant="contained" onClick={handleSubmit(submit)}>ミーティングに参加する</LoadingButton>
            </div>
        </Paper>
    );
}

export default JoinForm
