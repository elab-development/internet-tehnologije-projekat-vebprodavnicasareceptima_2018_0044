import recept_1 from './recept_1.jpg'
import recept_2 from './recept_2.jpg'
import recept_3 from './recept_3.jpg'
import logo from './logo.png'
import header from './header.jpg'
import kategorija_1 from './kategorija_1.jpg'
import kategorija_2 from './kategorija_2.jpg'
import kategorija_3 from './kategorija_3.jpg'
import kategorija_4 from './kategorija_4.jpg'
import kategorija_5 from './kategorija_5.jpg'
import kategorija_6 from './kategorija_6.jpg'
import kategorija_7 from './kategorija_7.jpg'

export const assets = {
    logo,
    header,
    recept_1
} 

export const kategorija_list = [
    {
        kat_name: "Predjela",
        kat_image: kategorija_1
    },
    {
        kat_name: "Glavna jela",
        kat_image: kategorija_2
    },
    {
        kat_name: "Salate",
        kat_image: kategorija_3
    },
    {
        kat_name: "Deserti",
        kat_image: kategorija_4
    },
    {
        kat_name: "Supe i čorbe",
        kat_image: kategorija_5
    },
    {
        kat_name: "15. minutni obroci",
        kat_image: kategorija_6
    },
    {
        kat_name: "Testa",
        kat_image: kategorija_7
    }
]

export const recepti_list = [
    {
        id: 1,
        kat_name: "Predjela",
        recept_name:"Brusketi" ,
        recept_desc: "Ovaj klasičan italijanski recept jednostavan je i osvežavajuć. Hrskavi tost sa svežim paradajzom i bosiljkom savršen je kao lagano predjelo.",
        recept_time: "10 min",
        recept_image: recept_2
    },

    {
        id:2,
        kat_name: "15. minutni obroci",
        recept_name:"Avokado tost" ,
        recept_desc: "Ovo lagano predjelo kombinuje kremasti avokado sa osvežavajućim limetom i blago pikantnim čilijem. Na vrh se dodaje sveze posirano jaje.",
        recept_time: "13 min",
        recept_image: recept_1
    },
    {
        id:3,
        kat_name: "Glavna jela",
        recept_name:"Piletina sa povrćem" ,
        recept_desc: "Ovo jelo je idealno za brzo i ukusno glavno jelo. Sočna piletina u kombinaciji sa povrćem daje bogat ukus, a priprema je jednostavna.",
        recept_time: "45 min",
        recept_image: recept_3
    }
]

export const sastojci_list = [
    {
        id:1,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:2,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:3,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:4,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:5,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:6,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:7,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:8,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:9,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:10,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:11,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:12,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:13,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:14,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:15,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:18,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    {
        id:28,
        name: "Jaja",
        unit:"kom",
        price: 180,
        imgSrc: recept_1
    },
    
]