'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import NairuthyaCampaignForm from './NairuthyaCampaignForm';
import NairuthyaPlantations from '@/components/projects/nairuthya/NairuthyaPlantations';
import NairuthyaAmenities from '@/components/projects/nairuthya/NairuthyaAmenities';
import NairuthyaGallery from '@/components/projects/nairuthya/NairuthyaGallery';
import NairuthyaReviews from './NairuthyaReviews';
import {
  ArrowRight,
  ChevronDown,
  Play,
  Trees,
  Sprout,
  Users,
  ShieldCheck,
  MapPin,
  Navigation,
  Search,
  ExternalLink,
  Plus,
  Minus,
  Phone
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Exact organic hand-torn SVG paths matching user reference images
const SAGE_TOP_DECKLE = "M0,50 L0,10.8 L8,11.7 L16,11.1 L24,13.3 L32,14.4 L40,13 L48,15.3 L56,14.8 L64,16.6 L72,14.8 L80,17.8 L88,16.3 L96,16.7 L104,17.8 L112,16.9 L120,18.9 L128,19.7 L136,19.9 L144,19.2 L152,18 L160,19.8 L168,19.3 L176,17.7 L184,18 L192,17.2 L200,16.8 L208,19.7 L216,17.7 L224,16.8 L232,19.3 L240,19.1 L248,19.3 L256,18.4 L264,19.2 L272,18.7 L280,18.5 L288,16.2 L296,16.7 L304,17.6 L312,18.6 L320,18.2 L328,17.2 L336,17.2 L344,17.6 L352,15.3 L360,17.2 L368,16.6 L376,16.9 L384,16.5 L392,16.4 L400,16.2 L408,16.4 L416,18.5 L424,18.4 L432,18.3 L440,17.3 L448,17.7 L456,16.7 L464,17.7 L472,19 L480,19.9 L488,17.5 L496,16.8 L504,18.9 L512,18.2 L520,19.3 L528,18.4 L536,17.6 L544,17.6 L552,16.5 L560,17.2 L568,16.6 L576,18.1 L584,15 L592,17.7 L600,14.1 L608,15.8 L616,15.4 L624,13.1 L632,14.3 L640,14.7 L648,13.1 L656,12 L664,10.2 L672,12.1 L680,10.4 L688,10.5 L696,8.2 L704,7.5 L712,10.1 L720,6.5 L728,8.5 L736,7 L744,4.9 L752,8 L760,6.4 L768,5.2 L776,3.8 L784,6.2 L792,5.3 L800,4.7 L808,4.5 L816,6.6 L824,5 L832,6.3 L840,3.7 L848,6.2 L856,5.9 L864,5.1 L872,6.3 L880,8.3 L888,8.5 L896,6.5 L904,8 L912,8.4 L920,8.4 L928,9.7 L936,9.7 L944,9.8 L952,11.3 L960,10.1 L968,12 L976,14.2 L984,14.6 L992,12.8 L1000,16.2 L1008,14 L1016,13.7 L1024,15.1 L1032,16.7 L1040,16 L1048,16 L1056,17.1 L1064,17.6 L1072,16.7 L1080,16.6 L1088,16.4 L1096,18.6 L1104,16.7 L1112,17.5 L1120,19.7 L1128,18.8 L1136,18.8 L1144,18 L1152,17.4 L1160,18.4 L1168,18.6 L1176,17.7 L1184,17.7 L1192,19.5 L1200,17.5 L1208,18.3 L1216,18.6 L1224,18.5 L1232,18.2 L1240,17.6 L1248,18.7 L1256,15.4 L1264,17.9 L1272,16 L1280,18.5 L1288,17.6 L1296,15.6 L1304,18.4 L1312,18.1 L1320,18.7 L1328,16.7 L1336,17.4 L1344,16.5 L1352,18.1 L1360,16.8 L1368,17.2 L1376,17.2 L1384,17.9 L1392,18.8 L1400,18.7 L1408,18.4 L1416,19.3 L1424,17.2 L1432,19.8 L1440,19.8 L1440,50 Z";

const SAGE_TOP_PAPER = "M0,50 L0,23.6 L8,23.3 L16,25.5 L24,25.1 L32,24.8 L40,23.3 L48,23.1 L56,23.3 L64,24.3 L72,22.7 L80,23.8 L88,23.3 L96,25.2 L104,24.3 L112,25.1 L120,21.9 L128,23 L136,24.3 L144,24.6 L152,24.7 L160,22.5 L168,24.5 L176,24.1 L184,24.6 L192,22.9 L200,22.5 L208,21.6 L216,24.9 L224,24.9 L232,21.9 L240,24.8 L248,22.2 L256,23.5 L264,24.1 L272,23 L280,24.2 L288,24.2 L296,24.9 L304,25.4 L312,22.9 L320,25.9 L328,25.1 L336,25.2 L344,24 L352,24.5 L360,25.4 L368,24 L376,25.2 L384,24.9 L392,23.7 L400,24.9 L408,21.7 L416,24.7 L424,21.7 L432,20.8 L440,21.4 L448,20.6 L456,20 L464,22.4 L472,19.5 L480,20.9 L488,18.5 L496,20 L504,18.1 L512,18.4 L520,16.5 L528,16.6 L536,16.6 L544,14.3 L552,14.5 L560,14.8 L568,14.8 L576,13.3 L584,14.4 L592,12.7 L600,11.1 L608,13.5 L616,12.9 L624,12.9 L632,10.1 L640,9.9 L648,9.8 L656,9.3 L664,12.4 L672,10.2 L680,12.6 L688,11.2 L696,12.1 L704,10.8 L712,11.3 L720,13.5 L728,12.4 L736,14.1 L744,12.1 L752,15.2 L760,13.9 L768,16.5 L776,17.2 L784,15.7 L792,17.4 L800,16.3 L808,17.2 L816,19.7 L824,20.6 L832,19.9 L840,21.2 L848,21.1 L856,21.5 L864,19.9 L872,22.8 L880,23.6 L888,24 L896,23.3 L904,23.8 L912,24.5 L920,24.3 L928,23.8 L936,22.9 L944,23.6 L952,25 L960,24.1 L968,26.2 L976,25.2 L984,26.1 L992,23.1 L1000,26.1 L1008,23.4 L1016,22.8 L1024,25.7 L1032,24.6 L1040,23.4 L1048,25.5 L1056,24.1 L1064,22.8 L1072,23.5 L1080,23.5 L1088,22.7 L1096,24.7 L1104,24.4 L1112,24.5 L1120,23.8 L1128,24.7 L1136,22.7 L1144,22.1 L1152,22.4 L1160,22.4 L1168,24.6 L1176,22.5 L1184,24.9 L1192,22.2 L1200,22.9 L1208,24.6 L1216,23.5 L1224,25 L1232,23.1 L1240,22.7 L1248,23.2 L1256,25.1 L1264,24.7 L1272,25.9 L1280,25 L1288,24.1 L1296,23.9 L1304,24.3 L1312,25.5 L1320,25.8 L1328,24.3 L1336,23.5 L1344,25.7 L1352,23 L1360,22.9 L1368,21.8 L1376,21.7 L1384,21.7 L1392,22.5 L1400,22 L1408,21.4 L1416,22.1 L1424,21.8 L1432,20 L1440,18.9 L1440,50 Z";

const SAGE_BOTTOM_DECKLE = "M0,0 L0,17.7 L8,20.5 L16,19.7 L24,21.6 L32,19.7 L40,20.8 L48,21.6 L56,22.3 L64,21.1 L72,22.5 L80,22.7 L88,25.5 L96,25.6 L104,25.9 L112,24.9 L120,25.4 L128,26.1 L136,27.7 L144,26.6 L152,28.2 L160,28.2 L168,27.1 L176,30.1 L184,27.8 L192,28.4 L200,29.8 L208,31.4 L216,32 L224,28.7 L232,30.1 L240,32.2 L248,31.8 L256,28.9 L264,30.6 L272,30.1 L280,29.1 L288,28.7 L296,28.5 L304,28.9 L312,31.6 L320,28.8 L328,29.8 L336,30.2 L344,28.8 L352,29.9 L360,29.6 L368,30.1 L376,30.5 L384,27.9 L392,30.8 L400,29.9 L408,29.9 L416,28.7 L424,29.3 L432,30.3 L440,29 L448,30.4 L456,30.4 L464,29.4 L472,31 L480,28.1 L488,28 L496,29 L504,28.5 L512,29.6 L520,29.3 L528,29.3 L536,28.7 L544,29.9 L552,31.9 L560,30 L568,32.1 L576,30.7 L584,31.6 L592,30.2 L600,30.7 L608,31.2 L616,29.3 L624,29.7 L632,30.4 L640,30.6 L648,29.2 L656,30.4 L664,28.8 L672,27.1 L680,26 L688,28.7 L696,28.5 L704,25.4 L712,24.9 L720,24.3 L728,23.3 L736,25.8 L744,23 L752,24.7 L760,22.6 L768,22.8 L776,20.7 L784,20.4 L792,21.7 L800,19.8 L808,20.6 L816,17.8 L824,20 L832,17.9 L840,19.6 L848,16.1 L856,17.2 L864,18.2 L872,16.4 L880,16.7 L888,18.5 L896,15.4 L904,17.7 L912,18.6 L920,18.2 L928,18.3 L936,16.4 L944,19.2 L952,19.9 L960,20.3 L968,19.8 L976,20.4 L984,21.3 L992,21.3 L1000,21.1 L1008,20.6 L1016,21.6 L1024,23.4 L1032,23.1 L1040,22.1 L1048,25.2 L1056,23.1 L1064,24.2 L1072,24.3 L1080,25.7 L1088,25.6 L1096,25.6 L1104,28.5 L1112,27.8 L1120,26.9 L1128,29.5 L1136,28.6 L1144,29.7 L1152,30.1 L1160,29.5 L1168,28.3 L1176,31.7 L1184,32 L1192,31.4 L1200,28.9 L1208,30.5 L1216,29.8 L1224,30.1 L1232,30 L1240,32 L1248,29.9 L1256,28.5 L1264,29.2 L1272,29.7 L1280,31.2 L1288,29.8 L1296,31.1 L1304,28.9 L1312,28.3 L1320,28.6 L1328,30.3 L1336,29.8 L1344,30.8 L1352,29.9 L1360,28.8 L1368,28.7 L1376,29.1 L1384,30.3 L1392,30.6 L1400,29.4 L1408,28.7 L1416,27.7 L1424,28.7 L1432,29 L1440,28.2 L1440,0 Z";

const SAGE_BOTTOM_PAPER = "M0,0 L0,21.3 L8,23.4 L16,22.4 L24,22.1 L32,22.5 L40,23.7 L48,22.4 L56,23.8 L64,25.5 L72,23.7 L80,25.5 L88,25.8 L96,23.9 L104,25.4 L112,26 L120,24.5 L128,25.1 L136,24.2 L144,23.6 L152,22.7 L160,25.3 L168,22.7 L176,23 L184,24 L192,23.4 L200,24.3 L208,21.7 L216,23.6 L224,24.4 L232,23.5 L240,21.4 L248,21.5 L256,23.9 L264,21.7 L272,23.9 L280,24.3 L288,22.6 L296,22.7 L304,22.7 L312,22 L320,22.7 L328,24 L336,24.7 L344,25.5 L352,22.6 L360,25.2 L368,25.3 L376,23.5 L384,24.9 L392,23.6 L400,24.4 L408,25.1 L416,25.2 L424,23.3 L432,23.8 L440,24.5 L448,25.1 L456,25.8 L464,23 L472,24.1 L480,22 L488,22.1 L496,21.9 L504,24.5 L512,23.2 L520,23.3 L528,20.6 L536,20.8 L544,19.5 L552,18.9 L560,20 L568,18.8 L576,17.5 L584,18.6 L592,19.4 L600,17.7 L608,14.9 L616,15.7 L624,14.3 L632,13.9 L640,12.9 L648,12.3 L656,13.6 L664,12.6 L672,13.2 L680,12.1 L688,12.7 L696,11.7 L704,10.9 L712,11.3 L720,12.6 L728,11.6 L736,10 L744,10.6 L752,12.1 L760,10.1 L768,10.5 L776,10.4 L784,13.2 L792,10.4 L800,11.5 L808,13.7 L816,11.6 L824,13.2 L832,12.9 L840,15.5 L848,13.4 L856,15.8 L864,16.5 L872,16.9 L880,16.6 L888,19.4 L896,18.2 L904,20.2 L912,18.5 L920,18.5 L928,21 L936,22.3 L944,22.7 L952,20.4 L960,21.6 L968,21.7 L976,23.2 L984,24.8 L992,24 L1000,23.8 L1008,22.9 L1016,23.8 L1024,23.8 L1032,24.2 L1040,22.8 L1048,24.5 L1056,23.3 L1064,26 L1072,24 L1080,25.2 L1088,24.2 L1096,23.8 L1104,24.4 L1112,22.5 L1120,25.4 L1128,22.4 L1136,22.6 L1144,23.3 L1152,24.3 L1160,22.3 L1168,22.7 L1176,24.6 L1184,23.3 L1192,21.4 L1200,24.8 L1208,23.5 L1216,24.6 L1224,22.8 L1232,24.5 L1240,23.1 L1248,23.8 L1256,24.1 L1264,21.9 L1272,22 L1280,23.8 L1288,22.5 L1296,22.5 L1304,25.1 L1312,22.8 L1320,23 L1328,25.7 L1336,24.1 L1344,25.1 L1352,23.7 L1360,24.3 L1368,23.1 L1376,23.8 L1384,24.8 L1392,25.3 L1400,24 L1408,23.5 L1416,22.7 L1424,25.7 L1432,25.4 L1440,23.7 L1440,0 Z";



const MOUNTAIN_RIP_TOP = "M0,0 L0,115.2 L10,113.4 L20,114.5 L30,114.8 L40,112.3 L50,114.1 L60,114.9 L70,113.5 L80,112.6 L90,113.1 L100,110.8 L110,107.9 L120,107.5 L130,106.2 L140,105.9 L150,107.9 L160,105.7 L170,104.7 L180,104.3 L190,103.1 L200,102 L210,102.6 L220,100.4 L230,99.7 L240,100.6 L250,99.1 L260,99.5 L270,95.7 L280,97 L290,94.8 L300,93.6 L310,95.4 L320,95.2 L330,91.7 L340,91.8 L350,94.1 L360,91.4 L370,91.6 L380,88.8 L390,90.2 L400,88.3 L410,85.1 L420,85.7 L430,83.7 L440,80.5 L450,79.6 L460,79.5 L470,77 L480,77.9 L490,73.6 L500,72.5 L510,70.6 L520,72.2 L530,69.2 L540,67.8 L550,69.2 L560,65 L570,67.5 L580,66.8 L590,66 L600,63.7 L610,62.8 L620,62 L630,62.1 L640,62.9 L650,62.6 L660,64.3 L670,64.7 L680,65.4 L690,63.8 L700,65.4 L710,67.6 L720,69.8 L730,70.4 L740,70.4 L750,71.4 L760,68.7 L770,70.9 L780,69.8 L790,73.6 L800,70.4 L810,70.2 L820,70.3 L830,70.1 L840,70.1 L850,72.3 L860,71.7 L870,71.1 L880,69.2 L890,68.9 L900,66.8 L910,66.9 L920,63.5 L930,63.4 L940,59.5 L950,61.6 L960,58.9 L970,57 L980,53.2 L990,55.2 L1000,53.4 L1010,52.6 L1020,50.6 L1030,46.7 L1040,45.5 L1050,46.8 L1060,46.9 L1070,45.8 L1080,41.7 L1090,43.6 L1100,43.2 L1110,40.8 L1120,38.5 L1130,39.2 L1140,37.7 L1150,36.8 L1160,39.3 L1170,37.8 L1180,36.2 L1190,36.7 L1200,34.5 L1210,34 L1220,33.2 L1230,33.2 L1240,31.7 L1250,34 L1260,31.7 L1270,31 L1280,29.1 L1290,27.6 L1300,29.7 L1310,28.2 L1320,26.8 L1330,25.7 L1340,25.2 L1350,23.2 L1360,24.9 L1370,22 L1380,22.8 L1390,21.3 L1400,20.7 L1410,19.5 L1420,20.7 L1430,22.9 L1440,23.1 L1440,0 Z";

const MOUNTAIN_RIP_DECKLE = "M0,0 L0,121.9 L10,119 L20,119.5 L30,121 L40,116.9 L50,118.7 L60,116.7 L70,116.1 L80,114.4 L90,115 L100,110.4 L110,108.5 L120,109.7 L130,105.9 L140,107.3 L150,103.1 L160,100.8 L170,100.8 L180,101.1 L190,97 L200,98.9 L210,93.9 L220,96.5 L230,91.7 L240,91.2 L250,93.2 L260,88.9 L270,90.8 L280,88.7 L290,88 L300,86.1 L310,88.5 L320,86.6 L330,86.7 L340,86 L350,86 L360,86 L370,82.6 L380,83.7 L390,81.4 L400,83.9 L410,81.2 L420,82.4 L430,79.3 L440,80 L450,78.7 L460,78.5 L470,78 L480,76.1 L490,75.4 L500,76.9 L510,76.3 L520,71.9 L530,74.8 L540,73.5 L550,74 L560,73.5 L570,69.5 L580,71.4 L590,70.8 L600,70.1 L610,70.1 L620,72.7 L630,69.1 L640,71.7 L650,72.6 L660,71.9 L670,73.7 L680,72 L690,72 L700,73.3 L710,72.2 L720,74.7 L730,75.9 L740,74.4 L750,77.1 L760,74.6 L770,75.8 L780,76.5 L790,74.8 L800,73.8 L810,74.2 L820,73.8 L830,73.8 L840,71.8 L850,69.2 L860,69.5 L870,67 L880,66.9 L890,62.7 L900,61.8 L910,60.7 L920,59.4 L930,58.1 L940,56.9 L950,53.9 L960,50.3 L970,49.6 L980,48.4 L990,44.4 L1000,45 L1010,44.8 L1020,42.6 L1030,41.1 L1040,41.2 L1050,38.7 L1060,39.7 L1070,35.5 L1080,38.5 L1090,34.6 L1100,37.1 L1110,35.6 L1120,35.3 L1130,35.7 L1140,35.3 L1150,35 L1160,36.5 L1170,35 L1180,35.2 L1190,36.8 L1200,36.1 L1210,37.1 L1220,33.9 L1230,35.7 L1240,34.1 L1250,37.3 L1260,35.5 L1270,35.7 L1280,36.6 L1290,33 L1300,35.7 L1310,33.4 L1320,34 L1330,31.7 L1340,33.6 L1350,32.3 L1360,29.7 L1370,31 L1380,29.9 L1390,27.6 L1400,27.7 L1410,28.5 L1420,27.2 L1430,29.3 L1440,26.1 L1440,0 Z";

const FULL_SHEET_TORN_DECKLE = "M0,0 L530.3,0 L530.3,0 L530.1,3.6 L531.6,7.2 L532.6,10.8 L530.3,14.3 L533.0,17.9 L529.4,21.5 L535.4,25.1 L532.9,28.7 L532.7,32.3 L536.9,35.8 L536.2,39.4 L536.0,43 L536.2,46.6 L534.9,50.2 L535.7,53.8 L536.1,57.3 L543.1,60.9 L535.7,64.5 L533.9,68.1 L533.4,71.7 L533.1,75.3 L533.3,78.9 L536.0,82.4 L534.9,86 L534.6,89.6 L528.1,93.2 L531.4,96.8 L535.3,100.4 L532.5,103.9 L528.6,107.5 L528.0,111.1 L529.9,114.7 L524.7,118.3 L530.6,121.9 L525.5,125.4 L523.1,129 L524.1,132.6 L525.7,136.2 L524.3,139.8 L524.2,143.4 L521.0,147 L518.2,150.5 L521.7,154.1 L524.3,157.7 L521.3,161.3 L517.6,164.9 L518.3,168.5 L519.9,172 L521.3,175.6 L515.2,179.2 L515.5,182.8 L516.6,186.4 L520.9,190 L515.7,193.5 L517.2,197.1 L518.7,200.7 L519.5,204.3 L517.9,207.9 L519.6,211.5 L517.4,215.1 L514.0,218.6 L516.7,222.2 L518.5,225.8 L517.4,229.4 L518.6,233 L519.3,236.6 L521.7,240.1 L525.5,243.7 L528.7,247.3 L520.6,250.9 L523.3,254.5 L523.5,258.1 L525.2,261.6 L529.2,265.2 L529.8,268.8 L529.2,272.4 L532.3,276 L531.2,279.6 L529.4,283.2 L529.5,286.7 L530.9,290.3 L535.3,293.9 L536.4,297.5 L535.0,301.1 L536.8,304.7 L536.7,308.2 L540.2,311.8 L540.5,315.4 L537.2,319 L539.9,322.6 L536.7,326.2 L545.6,329.7 L539.8,333.3 L537.6,336.9 L541.6,340.5 L541.2,344.1 L541.0,347.7 L540.0,351.3 L541.2,354.8 L537.9,358.4 L539.2,362 L540.1,365.6 L537.5,369.2 L542.5,372.8 L540.6,376.3 L540.4,379.9 L538.2,383.5 L536.3,387.1 L540.9,390.7 L534.3,394.3 L536.1,397.8 L540.1,401.4 L538.4,405 L536.3,408.6 L534.1,412.2 L529.8,415.8 L533.0,419.4 L529.9,422.9 L528.6,426.5 L526.4,430.1 L530.2,433.7 L526.5,437.3 L526.5,440.9 L523.2,444.4 L526.4,448 L520.3,451.6 L524.0,455.2 L524.1,458.8 L517.3,462.4 L520.8,465.9 L518.8,469.5 L519.4,473.1 L518.6,476.7 L513.5,480.3 L520.9,483.9 L512.5,487.5 L511.9,491 L512.7,494.6 L516.7,498.2 L514.7,501.8 L512.3,505.4 L512.7,509 L510.5,512.5 L512.5,516.1 L507.0,519.7 L503.6,523.3 L504.4,526.9 L505.1,530.5 L505.1,534.1 L504.7,537.6 L504.7,541.2 L503.6,544.8 L505.1,548.4 L504.5,552 L505.3,555.6 L503.5,559.1 L502.5,562.7 L499.8,566.3 L499.2,569.9 L498.6,573.5 L496.5,577.1 L501.5,580.6 L499.1,584.2 L492.7,587.8 L497.7,591.4 L497.8,595 L494.2,598.6 L494.2,602.2 L487.7,605.7 L492.0,609.3 L487.3,612.9 L490.0,616.5 L488.8,620.1 L489.0,623.7 L484.1,627.2 L486.1,630.8 L482.5,634.4 L483.7,638 L483.9,641.6 L480.8,645.2 L479.7,648.7 L479.2,652.3 L480.8,655.9 L478.6,659.5 L478.2,663.1 L482.5,666.7 L480.2,670.3 L481.1,673.8 L479.7,677.4 L475.1,681 L478.6,684.6 L482.0,688.2 L483.5,691.8 L478.7,695.3 L481.6,698.9 L476.0,702.5 L477.3,706.1 L477.0,709.7 L484.2,713.3 L479.9,716.8 L475.9,720.4 L476.0,724 L482.5,727.6 L482.6,731.2 L482.3,734.8 L484.1,738.4 L480.9,741.9 L485.4,745.5 L487.6,749.1 L487.3,752.7 L488.5,756.3 L492.0,759.9 L492.3,763.4 L491.3,767 L494.1,770.6 L492.8,774.2 L497.2,777.8 L500.2,781.4 L498.4,784.9 L499.2,788.5 L500.3,792.1 L505.3,795.7 L507.2,799.3 L507.2,802.9 L504.3,806.5 L511.2,810 L514.5,813.6 L510.9,817.2 L517.5,820.8 L515.6,824.4 L515.5,828 L519.7,831.5 L523.0,835.1 L521.1,838.7 L520.6,842.3 L524.0,845.9 L524.6,849.5 L520.4,853 L524.8,856.6 L525.6,860.2 L528.4,863.8 L525.2,867.4 L530.5,871 L528.8,874.6 L525.4,878.1 L531.2,881.7 L532.7,885.3 L531.9,888.9 L531.6,892.5 L532.5,896.1 L532.0,899.6 L532.4,903.2 L524.0,906.8 L530.2,910.4 L532.9,914 L528.4,917.6 L529.5,921.1 L527.0,924.7 L530.1,928.3 L532.8,931.9 L528.8,935.5 L531.5,939.1 L529.0,942.7 L528.5,946.2 L529.0,949.8 L532.9,953.4 L528.7,957 L525.3,960.6 L527.5,964.2 L525.5,967.7 L523.6,971.3 L521.8,974.9 L523.2,978.5 L523.2,982.1 L519.8,985.7 L524.8,989.2 L521.8,992.8 L520.6,996.4 L519.1,1000 L0,1000 Z";

const FULL_SHEET_TORN_PAPER = "M0,0 L520.9,0 L520.9,0 L522.8,3.6 L524.5,7.2 L525.0,10.8 L520.7,14.3 L524.9,17.9 L520.9,21.5 L527.0,25.1 L524.1,28.7 L525.1,32.3 L530.4,35.8 L525.8,39.4 L529.1,43 L529.0,46.6 L527.6,50.2 L526.4,53.8 L527.0,57.3 L533.3,60.9 L528.2,64.5 L525.0,68.1 L524.4,71.7 L526.0,75.3 L524.1,78.9 L527.5,82.4 L525.7,86 L525.7,89.6 L519.7,93.2 L521.8,96.8 L525.3,100.4 L522.9,103.9 L520.7,107.5 L518.7,111.1 L523.3,114.7 L517.8,118.3 L521.7,121.9 L515.3,125.4 L513.7,129 L516.6,132.6 L518.8,136.2 L514.3,139.8 L516.5,143.4 L513.5,147 L511.0,150.5 L513.5,154.1 L517.7,157.7 L513.4,161.3 L510.6,164.9 L508.4,168.5 L511.9,172 L512.1,175.6 L506.0,179.2 L505.1,182.8 L510.0,186.4 L514.1,190 L505.4,193.5 L510.0,197.1 L512.1,200.7 L510.7,204.3 L510.7,207.9 L509.9,211.5 L507.8,215.1 L503.8,218.6 L509.5,222.2 L510.2,225.8 L507.5,229.4 L510.0,233 L511.6,236.6 L511.5,240.1 L517.4,243.7 L519.0,247.3 L514.1,250.9 L515.2,254.5 L514.1,258.1 L514.8,261.6 L519.8,265.2 L519.6,268.8 L520.8,272.4 L523.9,276 L524.3,279.6 L522.3,283.2 L521.8,286.7 L520.8,290.3 L526.0,293.9 L526.5,297.5 L528.4,301.1 L527.3,304.7 L526.9,308.2 L533.4,311.8 L530.1,315.4 L527.2,319 L530.3,322.6 L529.9,326.2 L536.3,329.7 L531.8,333.3 L528.9,336.9 L534.5,340.5 L534.2,344.1 L532.4,347.7 L531.2,351.3 L534.5,354.8 L529.0,358.4 L530.2,362 L530.3,365.6 L529.4,369.2 L532.1,372.8 L533.6,376.3 L531.4,379.9 L527.8,383.5 L526.9,387.1 L534.3,390.7 L527.6,394.3 L529.4,397.8 L530.2,401.4 L528.6,405 L528.2,408.6 L524.8,412.2 L519.8,415.8 L522.9,419.4 L521.3,422.9 L519.1,426.5 L519.3,430.1 L521.1,433.7 L519.3,437.3 L518.9,440.9 L513.4,444.4 L516.9,448 L510.5,451.6 L515.2,455.2 L516.5,458.8 L510.7,462.4 L513.6,465.9 L510.0,469.5 L511.6,473.1 L510.8,476.7 L503.9,480.3 L512.1,483.9 L503.9,487.5 L503.9,491 L502.7,494.6 L506.5,498.2 L504.5,501.8 L504.8,505.4 L502.4,509 L502.6,512.5 L504.5,516.1 L499.4,519.7 L494.0,523.3 L494.2,526.9 L498.0,530.5 L498.5,534.1 L495.2,537.6 L497.7,541.2 L496.0,544.8 L495.9,548.4 L494.7,552 L495.5,555.6 L494.2,559.1 L495.4,562.7 L492.4,566.3 L490.9,569.9 L489.0,573.5 L489.4,577.1 L492.6,580.6 L491.1,584.2 L485.2,587.8 L487.8,591.4 L488.9,595 L486.9,598.6 L484.4,602.2 L479.2,605.7 L482.5,609.3 L478.7,612.9 L483.1,616.5 L478.6,620.1 L480.6,623.7 L474.0,627.2 L478.8,630.8 L475.7,634.4 L475.0,638 L476.6,641.6 L470.5,645.2 L470.3,648.7 L470.3,652.3 L471.2,655.9 L471.8,659.5 L471.3,663.1 L475.0,666.7 L472.6,670.3 L473.3,673.8 L473.1,677.4 L464.7,681 L468.3,684.6 L472.5,688.2 L476.1,691.8 L471.4,695.3 L474.9,698.9 L466.5,702.5 L470.7,706.1 L466.7,709.7 L474.0,713.3 L472.6,716.8 L465.9,720.4 L467.4,724 L472.9,727.6 L475.6,731.2 L474.2,734.8 L476.6,738.4 L473.8,741.9 L477.8,745.5 L478.7,749.1 L477.5,752.7 L482.0,756.3 L482.8,759.9 L482.6,763.4 L483.8,767 L486.9,770.6 L483.4,774.2 L487.9,777.8 L490.7,781.4 L490.8,784.9 L488.8,788.5 L493.6,792.1 L498.3,795.7 L497.6,799.3 L497.6,802.9 L494.0,806.5 L501.6,810 L505.8,813.6 L502.9,817.2 L508.6,820.8 L508.7,824.4 L508.5,828 L509.4,831.5 L516.4,835.1 L511.3,838.7 L512.1,842.3 L517.3,845.9 L517.4,849.5 L510.3,853 L515.1,856.6 L515.9,860.2 L518.6,863.8 L514.9,867.4 L522.5,871 L518.6,874.6 L518.1,878.1 L521.3,881.7 L526.0,885.3 L524.2,888.9 L521.4,892.5 L522.7,896.1 L524.4,899.6 L523.8,903.2 L516.8,906.8 L521.8,910.4 L525.5,914 L519.5,917.6 L521.4,921.1 L516.8,924.7 L521.8,928.3 L525.2,931.9 L520.5,935.5 L523.5,939.1 L518.9,942.7 L520.9,946.2 L519.2,949.8 L523.2,953.4 L520.7,957 L515.9,960.6 L520.8,964.2 L518.4,967.7 L515.0,971.3 L515.0,974.9 L513.9,978.5 L516.4,982.1 L509.8,985.7 L517.9,989.2 L513.7,992.8 L513.4,996.4 L512.1,1000 L0,1000 Z";


export default function NairuthyaCampaignClient({ project }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeLandmarkId, setActiveLandmarkId] = useState('nelamangala-town');
  const [mapMode, setMapMode] = useState('routes');
  const [zoomLevel, setZoomLevel] = useState(1);

  const scrollToForm = () => {
    const el = document.getElementById('enquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const landmarks = [
    {
      id: 'nelamangala-town',
      number: '01',
      name: 'Nelamangala Town',
      distance: 'Approx. 8 km',
      time: '~10 MINS',
      category: 'Civic Hub',
      note: 'Nearest taluk center with essential civic infrastructure',
      x: 520,
      y: 230,
      badgeX: 440,
      badgeY: 190,
      badgeW: 175,
      path: 'M 340 240 Q 430 225 520 230'
    },
    {
      id: 'bengaluru-city',
      number: '02',
      name: 'Bengaluru / Yeshwanthpur',
      distance: 'Approx. 35 km',
      time: '~35 MINS',
      category: 'City Hub',
      note: 'Direct highway connectivity via elevated corridor',
      x: 820,
      y: 340,
      badgeX: 710,
      badgeY: 295,
      badgeW: 210,
      path: 'M 340 240 Q 580 300 820 340'
    },
    {
      id: 'tumkur-road',
      number: '03',
      name: 'Tumkur Road (NH 48)',
      distance: 'Direct Access',
      time: 'Immediate',
      category: 'Expressway Corridor',
      note: 'Primary 6-lane regional expressway corridor',
      x: 440,
      y: 300,
      badgeX: 355,
      badgeY: 320,
      badgeW: 185,
      path: 'M 340 240 Q 380 275 440 300'
    },
    {
      id: 'strr-corridor',
      number: '04',
      name: 'STRR (Satellite Ring Road)',
      distance: 'Orbital Corridor',
      time: '~12 MINS',
      category: 'Regional Bypass',
      note: 'Fast orbital ring road connecting satellite towns',
      x: 590,
      y: 170,
      badgeX: 505,
      badgeY: 125,
      badgeW: 195,
      path: 'M 340 240 Q 460 190 590 170'
    },
    {
      id: 'shivagange',
      number: '05',
      name: 'Shivagange Heritage Hill',
      distance: 'Approx. 22 km',
      time: '~25 MINS',
      category: 'Historic Monolith',
      note: 'Scenic monolithic hill and heritage temple destination',
      x: 180,
      y: 360,
      badgeX: 95,
      badgeY: 380,
      badgeW: 195,
      path: 'M 340 240 Q 250 310 180 360'
    },
    {
      id: 'hesaraghatta',
      number: '06',
      name: 'Hesaraghatta Grasslands',
      distance: 'Approx. 24 km',
      time: '~30 MINS',
      category: 'Pastoral Lakebed',
      note: 'Scenic pastoral grasslands and protected lakebed',
      x: 690,
      y: 210,
      badgeX: 605,
      badgeY: 165,
      badgeW: 190,
      path: 'M 340 240 Q 510 210 690 210'
    }
  ];

  const faqs = [
    {
      q: 'What is the legal ownership structure of Nairuthya Whispering Wood?',
      a: 'You acquire direct, 100% individual registered legal ownership of your specific demarcated farmland parcel (starting from 6,000 sq.ft) with clear title deeds and Khata transfer directly in your name.'
    },
    {
      q: 'Do I need agricultural status in Karnataka to purchase this land?',
      a: 'Under current Karnataka Land Reforms amendments, non-agriculturists and salaried professionals can legally purchase and hold agricultural farmland. Our legal team assists with complete registration.'
    },
    {
      q: 'Who manages the farm, crops, and trees post-purchase?',
      a: 'Earth Heritage provides complete turnkey operational management. Our on-ground agrarian team manages soil enrichment, automated drip irrigation, pruning, seasonal weeding, and round-the-clock estate security.'
    },
    {
      q: 'What water resources and irrigation are provided?',
      a: 'The property has dedicated agrarian water resources including deep borewells and comprehensive sub-surface micro-drip networks connected directly to the root zones of all timber trees and fruit groves.'
    },
    {
      q: 'Can I construct a farm retreat or cottage on my parcel?',
      a: 'Yes. Owners frequently build eco-friendly farm cottages, wooden gazebos, or weekend retreat structures compliant with local agrarian development guidelines to enjoy family weekends.'
    }
  ];

  const displayFaqs = (project?.faqs && project.faqs.length > 0)
    ? project.faqs.map((f) => ({ q: f.question, a: f.answer }))
    : faqs;

  return (
    <div
      className="relative w-full bg-[#F5EFE6] text-[#2C382E] selection:bg-[#263828] selection:text-white font-sans antialiased overflow-hidden"
      style={{
        backgroundImage: "url('/images/campaign/paper_subtle_cream.jpg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '1024px 1024px'
      }}
    >
      {/* Soft warm wash over background to ensure maximum legibility */}
      <div className="absolute inset-0 bg-[#F5EFE6]/30 pointer-events-none" />

      {/* =========================================================================
          SECTION 1: HERO BANNER - 40/60 PROPORTION WITH SEAMLESS TORN PAPER
          Zero straight lines: Crushed paper background runs continuously to the torn edge.
          Left: 40% Wording (Brand Logo, Display Title, Subtitle, Dual CTAs).
          Right: 60% Project Banner Image inside the torn paper opening.
          ========================================================================= */}
      <section
        id="hero"
        className="relative w-full h-auto min-h-0 md:h-[calc(100vh-76px)] md:min-h-[520px] md:max-h-[820px] overflow-hidden bg-[#FAF8F3] border-b border-[#DDD3C2] z-10 flex flex-col md:block"
        aria-label="Welcome to Nairuthya Whispering Wood"
      >
        {/* -----------------------------------------------------------------
            1. MOBILE-ONLY BANNER IMAGE (FIRST IN MOBILE ORDER)
            Appears on top before details so mobile users immediately see the estate banner
            ----------------------------------------------------------------- */}
        <div className="w-full h-[280px] xs:h-[320px] sm:h-[380px] relative overflow-hidden md:hidden z-10">
          <Image
            src="/images/projects/nairuthya-whispering-wood-hero.jpg"
            alt="Nairuthya Whispering Wood 8-acre managed farmland in Honnasandra, Nelamangala"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: '44% center' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 pointer-events-none">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white shadow-md">
              <MapPin className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span className="font-serif text-[11px] sm:text-xs">Honnasandra, Nelamangala &bull; Actual Site</span>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            2. MOBILE HORIZONTAL TORN PAPER DIVIDER (Between banner image and details)
            Seamless torn paper transition between top image and details below
            ----------------------------------------------------------------- */}
        <div className="relative w-full h-5 sm:h-7 -mt-2 sm:-mt-3 z-20 pointer-events-none md:hidden overflow-hidden">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-full drop-shadow-sm">
            <path
              d={SAGE_TOP_PAPER}
              fill="#FAF8F3"
            />
          </svg>
        </div>

        {/* -----------------------------------------------------------------
            3. RIGHT SIDE: 60% WIDTH - PROJECT BANNER IMAGE (DESKTOP & LAPTOP)
            Positioned absolute covering right 56-62%, extending under the torn seam
            ----------------------------------------------------------------- */}
        <div className="hidden md:block md:absolute md:top-0 md:bottom-0 md:right-0 md:w-[56%] lg:w-[62%] md:h-full z-0 overflow-hidden">
          <Image
            src="/images/projects/nairuthya-whispering-wood-hero.jpg"
            alt="Nairuthya Whispering Wood 8-acre managed farmland in Honnasandra, Nelamangala"
            fill
            sizes="(max-width: 768px) 100vw, 62vw"
            className="object-cover object-center"
            priority
          />

          {/* Subtle vignette gradient on edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Location Pill Overlay on Bottom Right of the Photo */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 pointer-events-none">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white shadow-md">
              <MapPin className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span className="font-serif text-xs">Honnasandra, Nelamangala &bull; Actual Site</span>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            4. DESKTOP & LAPTOP UNIFIED CRUSHED PAPER SHEET (ZERO STRAIGHT LINES)
            Runs seamlessly from left edge (x=0) all the way into the torn cut (~40-48%).
            Uses the authentic paper_crush_bg.jpg texture pattern.
            ----------------------------------------------------------------- */}
        <div className="absolute top-0 bottom-0 left-0 w-full md:w-[calc(48%+70px)] lg:w-[calc(40%+95px)] xl:w-[calc(40%+115px)] h-full z-10 pointer-events-none hidden md:block overflow-visible">
          <svg
            viewBox="0 0 600 1000"
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{
              filter: 'drop-shadow(8px 0 16px rgba(10,18,10,0.48)) drop-shadow(2px 0 4px rgba(10,18,10,0.25))'
            }}
          >
            <defs>
              <pattern id="heroPaperCrushPattern" patternUnits="userSpaceOnUse" width="800" height="800">
                <image href="https://res.cloudinary.com/yffbj6hj/image/upload/v1792156450/earth-heritage/campaign/paper-crush-bg.jpg" width="800" height="800" />
              </pattern>
            </defs>

            {/* Exposed cotton pulp deckle fiber edge under-layer */}
            <path
              d={FULL_SHEET_TORN_DECKLE}
              fill="#FAF5EB"
            />
            {/* Main crushed paper surface layer (continuous from x=0 to torn edge) */}
            <path
              d={FULL_SHEET_TORN_PAPER}
              fill="url(#heroPaperCrushPattern)"
            />
            {/* Soft translucent wash over paper for optimal text legibility */}
            <path
              d={FULL_SHEET_TORN_PAPER}
              fill="#FAF8F3"
              fillOpacity="0.45"
            />
          </svg>

          {/* Top Botanical Leaf Accent along the Torn Paper Edge */}
          <div className="absolute top-6 right-8 w-12 h-12 xl:w-14 xl:h-14 transform rotate-12 opacity-90 drop-shadow-sm pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <path
                d="M20,80 Q40,30 85,20 Q60,65 20,80 Z"
                fill="#789A74"
              />
              <path
                d="M20,80 Q55,48 85,20"
                stroke="#4A6546"
                strokeWidth="2.5"
              />
              <path
                d="M40,65 Q50,55 58,58"
                stroke="#4A6546"
                strokeWidth="1.5"
              />
              <path
                d="M55,50 Q65,42 72,45"
                stroke="#4A6546"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Bottom Botanical Leaf Accent along the Torn Paper Edge */}
          <div className="absolute bottom-8 right-7 w-14 h-14 xl:w-16 xl:h-16 transform -rotate-12 opacity-90 drop-shadow-sm pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <path
                d="M25,85 Q20,35 75,25 Q70,75 25,85 Z"
                fill="#8FA88B"
              />
              <path
                d="M25,85 Q45,55 75,25"
                stroke="#4A6546"
                strokeWidth="2.5"
              />
              <path
                d="M38,70 Q50,65 56,70"
                stroke="#4A6546"
                strokeWidth="1.5"
              />
              <path
                d="M50,52 Q60,48 68,54"
                stroke="#4A6546"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            5. LEFT SIDE: 40-48% WIDTH - PROJECT DETAILS & WORDING
            Transparent on desktop & laptop so the unified crushed paper sheet shows through.
            Zero straight lines. Fits on screen without scroll.
            ----------------------------------------------------------------- */}
        <div className="w-full md:w-[48%] lg:w-[40%] flex-shrink-0 relative z-20 flex flex-col justify-center px-6 sm:px-10 md:pl-8 md:pr-4 lg:pl-10 lg:pr-6 xl:pl-14 xl:pr-8 py-6 sm:py-8 md:py-4 xl:py-6 md:h-full bg-transparent">
          {/* Mobile-only background container */}
          <div
            className="absolute inset-0 bg-[#FAF8F3] md:hidden pointer-events-none"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/yffbj6hj/image/upload/v1792156450/earth-heritage/campaign/paper-crush-bg.jpg')",
              backgroundRepeat: 'repeat',
              backgroundSize: '800px 800px'
            }}
          >
            <div className="absolute inset-0 bg-[#FAF8F3]/50" />
          </div>

          <div className="relative z-10 space-y-3.5 sm:space-y-4 xl:space-y-5 max-w-md xl:max-w-lg mx-auto md:mr-2 lg:mr-4 md:ml-auto w-full">
            
            {/* Project Brand Logo */}
            <div className="w-40 sm:w-48 md:w-40 lg:w-44 xl:w-52 h-auto pt-0.5">
              <Image
                src="/images/campaign/nairuthya_logo.png"
                alt="Nairuthya Whispering Wood"
                width={320}
                height={110}
                priority
                className="object-contain w-full h-auto drop-shadow-xs"
              />
            </div>

            {/* Display Headline */}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-[1.85rem] lg:text-[2.1rem] xl:text-[2.6rem] font-normal text-[#1E2E20] tracking-tight leading-[1.12]">
                Nairuthya<br />
                Whispering Wood<br />
                <span className="relative inline-block text-[#263828]">
                  Managed Farmland
                  <svg
                    className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-3 text-[#C9A86A]/85 pointer-events-none"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2,8 Q50,2 100,7 Q150,11 198,4"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Authentic Farmland Subtitle */}
            <p className="font-sans text-xs sm:text-sm text-[#556455] leading-relaxed max-w-md font-normal line-clamp-3">
              An 8-acre managed farmland enclave in Honnasandra, Nelamangala (~35 km from Bengaluru) with 25 titled plots, mature timber plantations, and comprehensive turnkey farm management by Earth Heritage.
            </p>

            {/* Dual CTA Buttons (Visible immediately above the fold with zero scroll) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                id="hero-inquire-cta"
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#263828] hover:bg-[#1A281B] active:scale-[0.98] text-white font-sans font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md cursor-pointer"
              >
                <span>Schedule Estate Visit &rarr;</span>
              </button>

              <a
                href="tel:+919902096969"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#FAF8F3] hover:bg-white border border-[#DDD3C2] text-[#243525] font-sans font-medium text-xs sm:text-sm transition-all shadow-sm cursor-pointer group"
              >
                <span className="w-6 h-6 rounded-full bg-[#E5ECE2] group-hover:bg-[#263828] group-hover:text-white flex items-center justify-center text-[#263828] transition-colors">
                  <Phone className="w-3 h-3" />
                </span>
                <span className="font-semibold text-[#1E2E20]">Call Now: +91 99020 96969</span>
              </a>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: SAGE GREEN TORN PAPER BANNER - MATCHING IMAGE 4 EXACTLY
          ========================================================================= */}
      <section
        id="stewardship"
        className="relative w-full text-[#1E2E20] py-20 sm:py-28 shadow-md scroll-mt-16"
        style={{
          backgroundImage: "url('/images/campaign/paper_subtle_sage.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '1024px 1024px',
          backgroundColor: '#B5C4B0'
        }}
        aria-label="Development &amp; Stewardship Model"
      >
        {/* ORGANIC NATURAL TORN PAPER TOP DIVIDER (Matching Image 4) */}
        <div className="absolute -top-7 sm:-top-9 left-0 right-0 overflow-hidden leading-none z-20 pointer-events-none">
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-8 sm:h-12">
            {/* White deckle paper fiber under-layer */}
            <path
              d={SAGE_TOP_DECKLE}
              fill="#FAF6EE"
              style={{ filter: 'drop-shadow(0 -3px 4px rgba(30,25,15,0.18))' }}
            />
            {/* Sage Green Paper Rip Layer */}
            <path
              d={SAGE_TOP_PAPER}
              fill="#B5C4B0"
            />
          </svg>
        </div>

        <Container size="default" className="relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative">
            
            {/* Left Content (Matching Image 4 Layout with Authentic Earth Heritage Details) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <MotionReveal delay={0.05}>
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#364937] font-semibold block">
                  DEVELOPMENT &amp; STEWARDSHIP MODEL
                </span>
              </MotionReveal>

              <MotionReveal delay={0.1}>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#172719] tracking-tight leading-tight">
                  Acquired, Developed, &amp; Managed by Earth Heritage
                </h2>
              </MotionReveal>

              <MotionReveal delay={0.15}>
                <p className="font-sans text-sm sm:text-base text-[#2C3E2D] leading-relaxed max-w-xl font-normal">
                  At Nairuthya Whispering Wood, we bridge direct legal land ownership with disciplined agricultural development and long-term farm stewardship. The estate is acquired by Earth Heritage, master-planned into 25 premium plots, and maintained through active on-ground agrarian oversight.
                </p>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#263828] hover:bg-[#1A281B] active:scale-[0.98] text-white font-sans font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md cursor-pointer"
                  >
                    <span>Explore Farm Stewardship &rarr;</span>
                  </button>
                </div>
              </MotionReveal>
            </div>

            {/* Right Icons: 3 Circular Badges in a Row (Matching Image 4 Layout with Real Project Pillars) */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3 sm:gap-4 text-center relative">
              
              <MotionReveal delay={0.15}>
                <div className="flex flex-col items-center space-y-2.5">
                  <div className="w-16 h-16 rounded-full bg-[#C8D7C2] border border-[#A7B9A0] flex items-center justify-center text-[#1E2E20] shadow-sm">
                    <ShieldCheck className="w-7 h-7 text-[#1E2E20]" />
                  </div>
                  <span className="font-serif text-xs sm:text-sm text-[#172719] font-medium leading-snug">
                    Direct Land<br />Acquisition
                  </span>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <div className="flex flex-col items-center space-y-2.5">
                  <div className="w-16 h-16 rounded-full bg-[#C8D7C2] border border-[#A7B9A0] flex items-center justify-center text-[#1E2E20] shadow-sm">
                    <Sprout className="w-7 h-7 text-[#1E2E20]" />
                  </div>
                  <span className="font-serif text-xs sm:text-sm text-[#172719] font-medium leading-snug">
                    Planned Farm<br />Development
                  </span>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.25}>
                <div className="flex flex-col items-center space-y-2.5">
                  <div className="w-16 h-16 rounded-full bg-[#C8D7C2] border border-[#A7B9A0] flex items-center justify-center text-[#1E2E20] shadow-sm">
                    <Users className="w-7 h-7 text-[#1E2E20]" />
                  </div>
                  <span className="font-serif text-xs sm:text-sm text-[#172719] font-medium leading-snug">
                    Turnkey Farm<br />Stewardship
                  </span>
                </div>
              </MotionReveal>

            </div>

            {/* Hand-Drawn Botanical Ink Branch on Far Right Margin (Matching Image 4) */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none opacity-85 hidden lg:block z-0">
              <Image
                src="https://res.cloudinary.com/yffbj6hj/image/upload/v1792156454/earth-heritage/campaign/botanical-ink-branch.png"
                alt="Botanical Ink Illustration"
                width={240}
                height={240}
                className="object-contain"
              />
            </div>

          </div>
        </Container>

        {/* ORGANIC NATURAL TORN PAPER BOTTOM DIVIDER (Matching Image 4) */}
        <div className="absolute -bottom-7 sm:-bottom-9 left-0 right-0 overflow-hidden leading-none z-20 pointer-events-none">
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-8 sm:h-12">
            {/* White deckle paper fiber under-layer */}
            <path
              d={SAGE_BOTTOM_DECKLE}
              fill="#FAF6EE"
              style={{ filter: 'drop-shadow(0 3px 4px rgba(30,25,15,0.18))' }}
            />
            {/* Sage Green Paper Rip Layer */}
            <path
              d={SAGE_BOTTOM_PAPER}
              fill="#B5C4B0"
            />
          </svg>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CULTIVATED FARM & PLANTATIONS (From Project Page)
          Styled with authentic landing page paper texture and botanical accents
          ========================================================================= */}
      <div id="holdings" className="relative w-full z-10">
        {/* Botanical Leaf Sprig in Left Margin (Matching Landing Page Design) */}
        <div className="absolute -left-12 top-14 w-48 h-48 pointer-events-none z-0 transform -rotate-[25deg] hidden lg:block">
          <Image
            src="https://res.cloudinary.com/yffbj6hj/image/upload/v1792156448/earth-heritage/campaign/botanical-leaves.png"
            alt="Botanical Leaf Foliage"
            width={240}
            height={240}
            className="object-contain opacity-90"
          />
        </div>

        <NairuthyaPlantations
          project={project}
          id="plantations"
          className="bg-transparent border-b-0 py-12 sm:py-16"
        />
      </div>

      {/* =========================================================================
          SECTION 4: AMENITIES & INFRASTRUCTURE (From Project Page)
          Replaces the Founder Perspectives quote section
          ========================================================================= */}
      <div id="perspectives" className="relative w-full z-10">
        <NairuthyaAmenities
          project={project}
          id="amenities"
          className="bg-transparent border-b-0 py-12 sm:py-16"
        />
      </div>

      {/* =========================================================================
          SECTION 6: REGIONAL WAYFINDING & LOCATION
          ========================================================================= */}
      <section
        id="location"
        className="relative w-full py-10 sm:py-14 z-10"
        aria-label="Location & Wayfinding"
      >
        <Container size="default">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
            
            <div className="max-w-2xl space-y-2">
              <MotionReveal delay={0.05}>
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#786E5E] font-semibold block">
                  REGIONAL CONNECTIVITY &amp; NEARBY ATTRACTIONS
                </span>
              </MotionReveal>

              <MotionReveal delay={0.1}>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#243525] tracking-tight">
                  Easy Access from Bengaluru
                </h2>
              </MotionReveal>

              <MotionReveal delay={0.15}>
                <p className="font-sans text-xs sm:text-sm text-[#5E6B5D] leading-relaxed">
                  Situated in the quiet, agrarian countryside of Honnasandra, Nelamangala Taluk. Smooth highway connectivity via NH-48 with prompt access to nearby landmarks and civic hubs.
                </p>
              </MotionReveal>
            </div>

            {/* Interactive Side-by-Side Dashboard Layout (Single section on Tablet & Laptop) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 lg:gap-8 items-stretch">
              
              {/* Left Column (5 cols on md+): Compact Interactive Destinations List */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  {/* Header bar above destination cards */}
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#DFD7C7]">
                    <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#364937] flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-[#263828]" />
                      <span>Nearby Destinations</span>
                    </span>
                    <span className="text-[10px] font-sans font-bold text-[#1E2E20] bg-[#C8D7C2] px-2 py-0.5 rounded-full border border-[#A7B9A0]">
                      6 Verified Places
                    </span>
                  </div>

                  {/* Compact Interactive Destination Cards */}
                  <div className="space-y-1.5">
                    {landmarks.map((lm) => {
                      const isActive = activeLandmarkId === lm.id;
                      return (
                        <div
                          key={lm.id}
                          onMouseEnter={() => setActiveLandmarkId(lm.id)}
                          onClick={() => {
                            setActiveLandmarkId(lm.id);
                            setMapMode('routes');
                          }}
                          className={cn(
                            'py-2 px-3 sm:py-2.5 sm:px-3.5 md:py-2 md:px-2.5 lg:py-2.5 lg:px-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2.5',
                            isActive
                              ? 'bg-[#B5C4B0] text-[#172719] border-[#8FA58A] shadow-xs translate-x-1 font-medium'
                              : 'bg-[#FAF8F3] hover:bg-[#C8D7C2]/70 border-[#DDD3C2] hover:border-[#A7B9A0] text-[#243525]'
                          )}
                        >
                          <div className="flex items-center gap-2 md:gap-2.5 min-w-0">
                            <span
                              className={cn(
                                'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0',
                                isActive
                                  ? 'bg-[#1E2E20] text-white'
                                  : 'bg-[#EAE2D3] text-[#4A5F4B] border border-[#DDD3C2]'
                              )}
                            >
                              {lm.number}
                            </span>
                            <div className="min-w-0">
                              <h3
                                className={cn(
                                  'font-serif text-xs md:text-[12px] lg:text-[13.5px] leading-tight truncate',
                                  isActive ? 'text-[#172719] font-bold' : 'text-[#243525] font-medium'
                                )}
                              >
                                {lm.name}
                              </h3>
                              <span
                                className={cn(
                                  'text-[10px] md:text-[9.5px] lg:text-[10px] font-sans block truncate',
                                  isActive ? 'text-[#2C3E2D]' : 'text-[#786E5E]'
                                )}
                              >
                                {lm.note}
                              </span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span
                              className={cn(
                                'text-[10.5px] md:text-[9.5px] lg:text-[10.5px] font-bold px-1.5 md:px-2 py-0.5 rounded-full inline-block',
                                isActive
                                  ? 'bg-[#1E2E20] text-[#FAF8F3]'
                                  : 'bg-[#E5ECE2] text-[#263828] border border-[#BDCABA]'
                              )}
                            >
                              {lm.distance}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Origin Info Bar & Direct Map Trigger */}
                <div className="p-2.5 sm:p-3 md:p-2 lg:p-3 rounded-xl bg-[#FAF8F3] border border-[#DDD3C2] flex items-center justify-between gap-1.5 md:gap-2 shadow-xs">
                  <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-[#E5ECE2] border border-[#BDCABA] flex items-center justify-center text-[#263828] shrink-0">
                      <MapPin className="w-3.5 h-3.5 text-[#263828]" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-serif text-xs md:text-[11px] lg:text-xs font-semibold text-[#243525] block leading-tight truncate">
                        Nairuthya Whispering Wood
                      </span>
                      <span className="text-[10px] md:text-[9px] lg:text-[10px] font-sans text-[#786E5E] block truncate">
                        Origin &bull; Honnasandra, Nelamangala
                      </span>
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/place/Whispering+Wood+by+Nairuthya+Properties/@13.0351622,77.332123,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 md:px-2 lg:px-3 py-1.5 rounded-full bg-[#263828] hover:bg-[#1A281B] active:scale-[0.98] text-white font-sans text-[10px] md:text-[9.5px] lg:text-[11px] font-medium tracking-wide shadow-xs transition-all cursor-pointer shrink-0"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3 text-[#C9A86A]" />
                  </a>
                </div>
              </div>

              {/* Right Column (7 cols on md+): Interactive Maps Dashboard */}
              <div className="md:col-span-7">
                <div className="h-full min-h-[380px] md:min-h-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#DDD3C2] bg-[#FAF8F3] shadow-sm relative flex flex-col justify-between">
                  
                  {/* Top Header Bar over Map */}
                  <div className="absolute top-3 left-3 right-3 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
                    
                    {/* Search address pill */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-[#DDD3C2] text-xs text-[#243525]">
                      <Search className="w-3.5 h-3.5 text-[#786E5E]" />
                      <span className="font-sans font-medium text-[11px] truncate max-w-[190px] sm:max-w-none">
                        Honnasandra, Nelamangala Taluk
                      </span>
                    </div>

                    {/* Mode Toggle + Open in Google Maps */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-[#DDD3C2] p-0.5 text-[11px] font-sans font-semibold">
                        <button
                          type="button"
                          onClick={() => setMapMode('routes')}
                          className={cn(
                            'px-2.5 py-1 rounded-full transition-colors cursor-pointer',
                            mapMode === 'routes'
                              ? 'bg-[#263828] text-white shadow-xs'
                              : 'text-[#5E6B5D] hover:text-[#243525]'
                          )}
                        >
                          Routes
                        </button>
                        <button
                          type="button"
                          onClick={() => setMapMode('live')}
                          className={cn(
                            'px-2.5 py-1 rounded-full transition-colors cursor-pointer',
                            mapMode === 'live'
                              ? 'bg-[#263828] text-white shadow-xs'
                              : 'text-[#5E6B5D] hover:text-[#243525]'
                          )}
                        >
                          Live Map
                        </button>
                      </div>

                      <a
                        href="https://www.google.com/maps/place/Whispering+Wood+by+Nairuthya+Properties/@13.0351622,77.332123,17z"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#DDD3C2] hover:bg-white text-xs font-sans font-medium text-[#263828] shadow-sm transition-all"
                      >
                        <span>Open Map</span>
                        <ExternalLink className="w-3 h-3 text-[#263828]" />
                      </a>
                    </div>
                  </div>

                  {/* Map Display Body */}
                  <div className="relative w-full h-full min-h-[380px] sm:min-h-[410px] overflow-hidden select-none">
                    {mapMode === 'live' ? (
                      <div className="relative w-full h-full min-h-[380px] sm:min-h-[410px]">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.00800222693!2d77.33212307359022!3d13.03516221348457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae310049c2514b%3A0x31df4bed6b535bbd!2sWhispering%20Wood%20by%20Nairuthya%20Properties!5e0!3m2!1sen!2sin!4v1790763247598!5m2!1sen!2sin"
                          title="Nairuthya Whispering Wood Live Google Map"
                          className="w-full h-full border-0 absolute inset-0"
                          loading="lazy"
                          allowFullScreen
                        />
                        {/* Bottom Floating Pill in Live Mode */}
                        <div className="absolute bottom-3 left-3 z-20 pointer-events-auto">
                          <a
                            href="https://www.google.com/maps/place/Whispering+Wood+by+Nairuthya+Properties/@13.0351622,77.332123,17z"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#DDD3C2] text-xs font-sans text-[#243525] shadow-md hover:bg-white transition-all"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#EA4335]" />
                            <span className="font-medium">Nairuthya Whispering Wood &bull; Full Directions</span>
                            <ExternalLink className="w-3 h-3 text-[#786E5E]" />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full min-h-[380px] sm:min-h-[410px]">
                        {/* Authentic Map Canvas Background */}
                        <Image
                          src="https://res.cloudinary.com/yffbj6hj/image/upload/v1792156451/earth-heritage/campaign/google-map-background.jpg"
                          alt="Google Maps View of Nelamangala and Bengaluru Corridors"
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover object-center"
                        />

                        {/* Interactive SVG Canvas Overlay */}
                        <div className="absolute inset-0">
                          <svg
                            viewBox="0 0 1000 560"
                            className="w-full h-full"
                            preserveAspectRatio="xMidYMid meet"
                            style={{
                              transform: `scale(${zoomLevel})`,
                              transformOrigin: '340px 240px',
                              transition: 'transform 0.3s ease-out'
                            }}
                          >
                            <defs>
                              <filter id="gmapShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
                              </filter>
                              <filter id="pinShadow" x="-30%" y="-30%" width="160%" height="160%">
                                <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.35" />
                              </filter>
                              <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3.5" />
                              </filter>
                            </defs>

                            {/* Connecting Routes */}
                            {landmarks.map((lm) => {
                              const isActive = activeLandmarkId === lm.id;
                              return (
                                <g key={`route-${lm.id}`}>
                                  {isActive && (
                                    <path
                                      d={lm.path}
                                      fill="none"
                                      stroke="#8FA58A"
                                      strokeWidth="9"
                                      strokeOpacity="0.65"
                                      strokeLinecap="round"
                                      filter="url(#routeGlow)"
                                    />
                                  )}
                                  <path
                                    d={lm.path}
                                    fill="none"
                                    stroke={isActive ? '#1E2E20' : '#4285F4'}
                                    strokeWidth={isActive ? '4.5' : '2'}
                                    strokeDasharray={isActive ? 'none' : '4 4'}
                                    strokeOpacity={isActive ? '1' : '0.55'}
                                    strokeLinecap="round"
                                    className="transition-all duration-300"
                                  />
                                </g>
                              );
                            })}

                            {/* Destination Pins & Floating Callout Badges */}
                            {landmarks.map((lm) => {
                              const isActive = activeLandmarkId === lm.id;
                              return (
                                <g
                                  key={`pin-${lm.id}`}
                                  onMouseEnter={() => setActiveLandmarkId(lm.id)}
                                  onClick={() => setActiveLandmarkId(lm.id)}
                                  className="cursor-pointer"
                                >
                                  {/* Destination Pin Base Shadow */}
                                  <ellipse cx={lm.x} cy={lm.y + 2} rx="6" ry="2.5" fill="rgba(0,0,0,0.3)" />

                                  {/* Destination Pin Marker */}
                                  <g filter="url(#pinShadow)">
                                    <circle
                                      cx={lm.x}
                                      cy={lm.y - 10}
                                      r={isActive ? '11' : '9'}
                                      fill={isActive ? '#1E2E20' : '#FFFFFF'}
                                      stroke={isActive ? '#FFFFFF' : '#1E2E20'}
                                      strokeWidth="2.5"
                                      className="transition-all duration-200"
                                    />
                                    <circle
                                      cx={lm.x}
                                      cy={lm.y - 10}
                                      r="4"
                                      fill={isActive ? '#B5C4B0' : '#1E2E20'}
                                    />
                                  </g>

                                  {/* Callout Pill Badge */}
                                  <g filter="url(#gmapShadow)">
                                    <rect
                                      x={lm.badgeX}
                                      y={lm.badgeY}
                                      width={lm.badgeW}
                                      height="26"
                                      rx="13"
                                      fill={isActive ? '#B5C4B0' : '#FAF8F3'}
                                      stroke={isActive ? '#8FA58A' : '#DDD3C2'}
                                      strokeWidth={isActive ? '1.5' : '1'}
                                      className="transition-colors duration-200"
                                    />

                                    {/* Number Circle Badge */}
                                    <circle
                                      cx={lm.badgeX + 13}
                                      cy={lm.badgeY + 13}
                                      r="8"
                                      fill={isActive ? '#1E2E20' : '#EAE2D3'}
                                    />
                                    <text
                                      x={lm.badgeX + 13}
                                      y={lm.badgeY + 16}
                                      textAnchor="middle"
                                      fill={isActive ? '#FFFFFF' : '#1E2E20'}
                                      fontSize="8"
                                      fontWeight="bold"
                                      fontFamily="sans-serif"
                                    >
                                      {lm.number}
                                    </text>

                                    {/* Text Label & Distance */}
                                    <text
                                      x={lm.badgeX + 26}
                                      y={lm.badgeY + 16.5}
                                      fill={isActive ? '#172719' : '#243525'}
                                      fontSize="9"
                                      fontWeight={isActive ? 'bold' : 'normal'}
                                      fontFamily="sans-serif"
                                    >
                                      {lm.name.split('(')[0].trim()} &bull;{' '}
                                      <tspan fill={isActive ? '#1E2E20' : '#263828'} fontWeight="bold">
                                        {lm.distance.replace('Approx. ', '')}
                                      </tspan>
                                    </text>
                                  </g>
                                </g>
                              );
                            })}

                            {/* Central Site Origin Marker (Nairuthya Whispering Wood) */}
                            <g id="origin-pin">
                              {/* Radar Ripple */}
                              <circle cx="340" cy="240" r="26" fill="#263828" fillOpacity="0.12" />
                              <circle cx="340" cy="240" r="15" fill="#263828" fillOpacity="0.22" />

                              {/* Ground Shadow */}
                              <ellipse cx="340" cy="243" rx="8" ry="3" fill="rgba(0,0,0,0.35)" />

                              {/* Google Maps Iconic Red Marker */}
                              <g filter="url(#pinShadow)">
                                <path
                                  d="M 340 240 C 330 228, 322 214, 322 201 C 322 191 330 183 340 183 C 350 183 358 191 358 201 C 358 214, 350 228, 340 240 Z"
                                  fill="#EA4335"
                                />
                                <circle cx="340" cy="201" r="5" fill="#FFFFFF" />
                              </g>

                              {/* Google Maps Origin Info Card */}
                              <g filter="url(#gmapShadow)">
                                <path d="M 340 180 L 334 172 L 346 172 Z" fill="#FFFFFF" />

                                <rect
                                  x="205"
                                  y="128"
                                  width="270"
                                  height="44"
                                  rx="8"
                                  fill="#FFFFFF"
                                  stroke="#DDD3C2"
                                  strokeWidth="1"
                                />

                                <circle cx="225" cy="144" r="8" fill="#E5ECE2" />
                                <circle cx="225" cy="144" r="3.5" fill="#263828" />

                                <text
                                  x="240"
                                  y="144"
                                  fill="#1E2E20"
                                  fontSize="11"
                                  fontWeight="bold"
                                  fontFamily="sans-serif"
                                >
                                  Nairuthya Whispering Wood
                                </text>

                                <text
                                  x="240"
                                  y="159"
                                  fill="#5E6B5D"
                                  fontSize="8.5"
                                  fontFamily="sans-serif"
                                >
                                  Site Origin &bull; Honnasandra, Nelamangala
                                </text>
                              </g>
                            </g>
                          </svg>
                        </div>

                        {/* Zoom Buttons in Routes Mode */}
                        <div className="absolute bottom-4 right-3 z-20 flex flex-col rounded-lg bg-white/95 backdrop-blur-md shadow-md border border-[#DDD3C2] overflow-hidden text-[#243525]">
                          <button
                            type="button"
                            onClick={() => setZoomLevel((prev) => Math.min(prev + 0.15, 1.45))}
                            className="w-7 h-7 flex items-center justify-center hover:bg-stone-50 border-b border-[#DDD3C2] transition-colors cursor-pointer"
                            aria-label="Zoom in"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setZoomLevel((prev) => Math.max(prev - 0.15, 0.85))}
                            className="w-7 h-7 flex items-center justify-center hover:bg-stone-50 transition-colors cursor-pointer"
                            aria-label="Zoom out"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Bottom attribution bar */}
                        <div className="absolute bottom-2 left-3 z-20 flex items-center gap-3 text-[10px] text-stone-600/90 pointer-events-none select-none">
                          <span className="font-bold tracking-tight text-stone-800 text-xs">
                            Google
                          </span>
                          <span className="hidden sm:inline text-stone-500">
                            Map data &copy;2026 Google
                          </span>
                          <span className="hidden sm:inline border-b border-stone-500 px-2 font-mono text-[9px]">
                            5 km
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>

          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 7: FAQ ACCORDION (SAGE GREEN TORN PAPER BANNER)
          Matching "Acquired, Developed, & Managed by Earth Heritage" Background
          ========================================================================= */}
      <section
        id="faq"
        className="relative w-full text-[#1E2E20] py-20 sm:py-28 shadow-md scroll-mt-16 z-10"
        style={{
          backgroundImage: "url('/images/campaign/paper_subtle_sage.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '1024px 1024px',
          backgroundColor: '#B5C4B0'
        }}
        aria-label="Frequently Asked Questions"
      >
        {/* ORGANIC NATURAL TORN PAPER TOP DIVIDER */}
        <div className="absolute -top-7 sm:-top-9 left-0 right-0 overflow-hidden leading-none z-20 pointer-events-none">
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-8 sm:h-12">
            {/* White deckle paper fiber under-layer */}
            <path
              d={SAGE_TOP_DECKLE}
              fill="#FAF6EE"
              style={{ filter: 'drop-shadow(0 -3px 4px rgba(30,25,15,0.18))' }}
            />
            {/* Sage Green Paper Rip Layer */}
            <path
              d={SAGE_TOP_PAPER}
              fill="#B5C4B0"
            />
          </svg>
        </div>

        <Container size="default" className="relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="text-center space-y-3">
              <MotionReveal delay={0.05}>
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#364937] font-semibold block">
                  QUESTIONS &amp; ANSWERS 🌿
                </span>
              </MotionReveal>

              <MotionReveal delay={0.1}>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#172719] tracking-tight">
                  Frequently Addressed Enquiries
                </h2>
              </MotionReveal>
            </div>

            {/* Accordion */}
            <div className="divide-y divide-[#9EB09A] border-y border-[#9EB09A]">
              {displayFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-6 sm:py-7">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="font-serif italic text-base text-[#364937] font-semibold">0{idx + 1}</span>
                        <h3 className="font-serif text-lg sm:text-xl font-normal text-[#172719] group-hover:text-[#2C3E2D] transition-colors">
                          {faq.q}
                        </h3>
                      </div>
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-[#364937] shrink-0 transition-transform duration-200',
                          isOpen ? 'rotate-180 text-[#172719]' : ''
                        )}
                      />
                    </button>

                    {isOpen && (
                      <div className="pt-3.5 pl-8 sm:pl-9 pr-4">
                        <p className="font-sans text-sm sm:text-base text-[#2C3E2D] leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </Container>

        {/* ORGANIC NATURAL TORN PAPER BOTTOM DIVIDER */}
        <div className="absolute -bottom-7 sm:-bottom-9 left-0 right-0 overflow-hidden leading-none z-20 pointer-events-none">
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-8 sm:h-12">
            {/* White deckle paper fiber under-layer */}
            <path
              d={SAGE_BOTTOM_DECKLE}
              fill="#FAF6EE"
              style={{ filter: 'drop-shadow(0 3px 4px rgba(30,25,15,0.18))' }}
            />
            {/* Sage Green Paper Rip Layer */}
            <path
              d={SAGE_BOTTOM_PAPER}
              fill="#B5C4B0"
            />
          </svg>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7B: ESTATE VISUAL GALLERY (Added before Enquiry Form)
          ========================================================================= */}
      <div className="relative w-full z-10">
        <NairuthyaGallery
          project={project}
          id="gallery"
          className="bg-transparent border-b-0 py-12 sm:py-16"
        />
      </div>

      {/* =========================================================================
          SECTION 7C: GENUINE GOOGLE REVIEWS (Immediately before Walkthrough Form)
          ========================================================================= */}
      <NairuthyaReviews id="reviews" />

      {/* =========================================================================
          SECTION 8: PRIVATE WALKTHROUGH & GET IN TOUCH FORM CARD
          ========================================================================= */}
      <NairuthyaCampaignForm />

    </div>
  );
}
