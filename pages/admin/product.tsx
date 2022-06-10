
import React, { useState, useEffect }from 'react'
import {Button, Container, Grid} from '@mui/material';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import Head from 'next/head';
import dynamic from 'next/dynamic';
const NavigationMobile = dynamic(() => import('../../component/Admin/NavigationMobile'))
const Navigation = dynamic(() => import('../../component/Admin/Navigation'))
const Layout = dynamic(() => import('../../component/Layout'),
    {
        loading: () => <div></div>
    }
)
import { useRouter } from 'next/router'
import TableManageMent from '../../component/BookPage/TableManageMent';

const columnDocs = [
    // {field: , headerName: , width: }
    {field: 'stt', headerName: "STT"},
    {field: 'name', headerName: "Tên tài liệu", width: 200},
    {field: 'author', headerName: "Tên tác giả", width: 120},
    {field: 'type', headerName: "Phân loại", width: 200},
    {field: 'view', headerName: "Số lượt xem"},
    {field: 'time', headerName: "Thời gian", width: 120},
    {field: 'link', headerName: "Link", width: 240},
    {field: 'hide', headerName: "Chế độ xem", width: 240},
]

const BookPage: React.FC = () => { 
    const router = useRouter(); 
    const infoUser = useSelector((state: RootStateOrAny) => state.userReducer.infoUser)
    const status = useSelector((state: RootStateOrAny) => state.userReducer)

    if (!status.isLoading) return (<div></div>)

    if (!status.isLogin) router.push('/login')

    if (infoUser.role == 'user') router.push('/')

    return (
        <Layout activeNav={"book"}>
            <Head>
                <title>Quản lý sản phẩm</title>
            </Head>
            <Container className='relative' maxWidth='lg'>
                <NavigationMobile option='product'></NavigationMobile>
                <Grid className='mb-16' container spacing={3}>
                    <Grid className='mt-16 min:hidden 900px:block' item md={3}>
                        <Navigation option='product'></Navigation>
                    </Grid>
                    <Grid className='mt-16 font-primary font-[500] text-[#000]' sm={12} item md={9}>
                        <div className='title text-[#2BBCBA] text-[24px]'>
                            Quản lý sản phẩm
                        </div>
                        
                        <div style={{ boxShadow: 'rgb(0 0 0 / 60%) 0px 3px 8px', padding: '25px' }} className='rounded-lg'>
                            <div className='title 
                                text-[22px] font-[600] text-[#000]
                            '>
                                Thông tin sản phẩm
                            </div>
                            <Grid container spacing={1} className='mt-2'>
                                <Grid item md={12} lg={12}>
                                    <TableManageMent
                                        columnDocs={columnDocs} 
                                        rowDocs={[]} 
                                        filter={''}
                                    />
                                </Grid>

                                <button
                                    className={
                                        "buy-button text-[16px] leading-[40px] bg-[#2BBCBA] px-[20px] text-white rounded-[4px] " +
                                        "hover:opacity-70 hover:cursor-pointer"
                                    }
                                    onClick={() => {
                                        router.push('/admin/product/add-product');
                                    }}
                                >
                                    Thêm sản phẩm
                                </button>
                                
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}


export default BookPage