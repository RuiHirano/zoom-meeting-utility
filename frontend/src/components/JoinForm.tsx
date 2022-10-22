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

export interface MeetingData {
    username: string
    meetingId: string
    password: string
}

export interface InputData {
    username: string
    meetingUrl: string
}

export const defaultInputData: InputData = {
    username: 'ZoomTranscribeBot',
    meetingUrl: '',
}

const schema = yup.object({
    username: yup.string().required(),
    meetingUrl: yup.string().required(),
}).required();

const JoinForm: React.FC<Props> = ({ onSubmit }) => {
    const [loading, setLoading] = React.useState<boolean>(false);

    const parseMeetingUrl = (url: string) => {
        const pattern = /\/(\d+)\?pwd=(.+)/g;
        const exec = pattern.exec(url);
        return { meetingId: exec ? exec[1] : "", password: exec ? exec[2] : "" };
    }

    const submit = async (data: InputData) => {
        setLoading(true)
        const parsed = parseMeetingUrl(data.meetingUrl)
        const meetingData: MeetingData = {
            username: data.username,
            meetingId: parsed.meetingId,
            password: parsed.password
        }
        onSubmit(meetingData)
        setLoading(false)
    }

    const { handleSubmit, setValue, getValues, formState: { errors } } = useForm<InputData>(
        { defaultValues: defaultInputData, resolver: yupResolver(schema) }
    );

    return (
        <Paper style={{ padding: 20 }}>
            {/*<InputField label="User Name" value={getValues("username")} error={errors.username?.message} onChange={(e) => { setValue("username", e.target.value) }} />*/}
            <InputField label="Meeting URL" value={getValues("meetingUrl")} error={errors.meetingUrl?.message} onChange={(e) => { setValue("meetingUrl", e.target.value) }} />
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LoadingButton loading={loading} size="large" style={{ fontWeight: 'bold' }} variant="contained" onClick={handleSubmit(submit)}>ミーティングに参加する</LoadingButton>
            </div>
        </Paper>
    );
}

export default JoinForm
