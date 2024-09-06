<?php

namespace App\Enums;

enum VrstaObroka: string
{
    case Dorucak = 'dorucak';
    case Brunc = 'brunc';
    case Rucak = 'rucak';
    case Vecera = 'vecera';
    case Uzina = 'uzina';
    case Desert = 'desert';
}