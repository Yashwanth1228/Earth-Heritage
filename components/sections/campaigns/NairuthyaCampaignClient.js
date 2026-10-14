'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import NairuthyaCampaignForm from './NairuthyaCampaignForm';
import {
  ArrowRight,
  ChevronDown,
  Play,
  Sun,
  Sprout,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Exact organic hand-torn SVG paths matching user reference images
const SAGE_TOP_DECKLE = "M0,50 L0,10.8 L8,11.7 L16,11.1 L24,13.3 L32,14.4 L40,13 L48,15.3 L56,14.8 L64,16.6 L72,14.8 L80,17.8 L88,16.3 L96,16.7 L104,17.8 L112,16.9 L120,18.9 L128,19.7 L136,19.9 L144,19.2 L152,18 L160,19.8 L168,19.3 L176,17.7 L184,18 L192,17.2 L200,16.8 L208,19.7 L216,17.7 L224,16.8 L232,19.3 L240,19.1 L248,19.3 L256,18.4 L264,19.2 L272,18.7 L280,18.5 L288,16.2 L296,16.7 L304,17.6 L312,18.6 L320,18.2 L328,17.2 L336,17.2 L344,17.6 L352,15.3 L360,17.2 L368,16.6 L376,16.9 L384,16.5 L392,16.4 L400,16.2 L408,16.4 L416,18.5 L424,18.4 L432,18.3 L440,17.3 L448,17.7 L456,16.7 L464,17.7 L472,19 L480,19.9 L488,17.5 L496,16.8 L504,18.9 L512,18.2 L520,19.3 L528,18.4 L536,17.6 L544,17.6 L552,16.5 L560,17.2 L568,16.6 L576,18.1 L584,15 L592,17.7 L600,14.1 L608,15.8 L616,15.4 L624,13.1 L632,14.3 L640,14.7 L648,13.1 L656,12 L664,10.2 L672,12.1 L680,10.4 L688,10.5 L696,8.2 L704,7.5 L712,10.1 L720,6.5 L728,8.5 L736,7 L744,4.9 L752,8 L760,6.4 L768,5.2 L776,3.8 L784,6.2 L792,5.3 L800,4.7 L808,4.5 L816,6.6 L824,5 L832,6.3 L840,3.7 L848,6.2 L856,5.9 L864,5.1 L872,6.3 L880,8.3 L888,8.5 L896,6.5 L904,8 L912,8.4 L920,8.4 L928,9.7 L936,9.7 L944,9.8 L952,11.3 L960,10.1 L968,12 L976,14.2 L984,14.6 L992,12.8 L1000,16.2 L1008,14 L1016,13.7 L1024,15.1 L1032,16.7 L1040,16 L1048,16 L1056,17.1 L1064,17.6 L1072,16.7 L1080,16.6 L1088,16.4 L1096,18.6 L1104,16.7 L1112,17.5 L1120,19.7 L1128,18.8 L1136,18.8 L1144,18 L1152,17.4 L1160,18.4 L1168,18.6 L1176,17.7 L1184,17.7 L1192,19.5 L1200,17.5 L1208,18.3 L1216,18.6 L1224,18.5 L1232,18.2 L1240,17.6 L1248,18.7 L1256,15.4 L1264,17.9 L1272,16 L1280,18.5 L1288,17.6 L1296,15.6 L1304,18.4 L1312,18.1 L1320,18.7 L1328,16.7 L1336,17.4 L1344,16.5 L1352,18.1 L1360,16.8 L1368,17.2 L1376,17.2 L1384,17.9 L1392,18.8 L1400,18.7 L1408,18.4 L1416,19.3 L1424,17.2 L1432,19.8 L1440,19.8 L1440,50 Z";

const SAGE_TOP_PAPER = "M0,50 L0,23.6 L8,23.3 L16,25.5 L24,25.1 L32,24.8 L40,23.3 L48,23.1 L56,23.3 L64,24.3 L72,22.7 L80,23.8 L88,23.3 L96,25.2 L104,24.3 L112,25.1 L120,21.9 L128,23 L136,24.3 L144,24.6 L152,24.7 L160,22.5 L168,24.5 L176,24.1 L184,24.6 L192,22.9 L200,22.5 L208,21.6 L216,24.9 L224,24.9 L232,21.9 L240,24.8 L248,22.2 L256,23.5 L264,24.1 L272,23 L280,24.2 L288,24.2 L296,24.9 L304,25.4 L312,22.9 L320,25.9 L328,25.1 L336,25.2 L344,24 L352,24.5 L360,25.4 L368,24 L376,25.2 L384,24.9 L392,23.7 L400,24.9 L408,21.7 L416,24.7 L424,21.7 L432,20.8 L440,21.4 L448,20.6 L456,20 L464,22.4 L472,19.5 L480,20.9 L488,18.5 L496,20 L504,18.1 L512,18.4 L520,16.5 L528,16.6 L536,16.6 L544,14.3 L552,14.5 L560,14.8 L568,14.8 L576,13.3 L584,14.4 L592,12.7 L600,11.1 L608,13.5 L616,12.9 L624,12.9 L632,10.1 L640,9.9 L648,9.8 L656,9.3 L664,12.4 L672,10.2 L680,12.6 L688,11.2 L696,12.1 L704,10.8 L712,11.3 L720,13.5 L728,12.4 L736,14.1 L744,12.1 L752,15.2 L760,13.9 L768,16.5 L776,17.2 L784,15.7 L792,17.4 L800,16.3 L808,17.2 L816,19.7 L824,20.6 L832,19.9 L840,21.2 L848,21.1 L856,21.5 L864,19.9 L872,22.8 L880,23.6 L888,24 L896,23.3 L904,23.8 L912,24.5 L920,24.3 L928,23.8 L936,22.9 L944,23.6 L952,25 L960,24.1 L968,26.2 L976,25.2 L984,26.1 L992,23.1 L1000,26.1 L1008,23.4 L1016,22.8 L1024,25.7 L1032,24.6 L1040,23.4 L1048,25.5 L1056,24.1 L1064,22.8 L1072,23.5 L1080,23.5 L1088,22.7 L1096,24.7 L1104,24.4 L1112,24.5 L1120,23.8 L1128,24.7 L1136,22.7 L1144,22.1 L1152,22.4 L1160,22.4 L1168,24.6 L1176,22.5 L1184,24.9 L1192,22.2 L1200,22.9 L1208,24.6 L1216,23.5 L1224,25 L1232,23.1 L1240,22.7 L1248,23.2 L1256,25.1 L1264,24.7 L1272,25.9 L1280,25 L1288,24.1 L1296,23.9 L1304,24.3 L1312,25.5 L1320,25.8 L1328,24.3 L1336,23.5 L1344,25.7 L1352,23 L1360,22.9 L1368,21.8 L1376,21.7 L1384,21.7 L1392,22.5 L1400,22 L1408,21.4 L1416,22.1 L1424,21.8 L1432,20 L1440,18.9 L1440,50 Z";

const SAGE_BOTTOM_DECKLE = "M0,0 L0,17.7 L8,20.5 L16,19.7 L24,21.6 L32,19.7 L40,20.8 L48,21.6 L56,22.3 L64,21.1 L72,22.5 L80,22.7 L88,25.5 L96,25.6 L104,25.9 L112,24.9 L120,25.4 L128,26.1 L136,27.7 L144,26.6 L152,28.2 L160,28.2 L168,27.1 L176,30.1 L184,27.8 L192,28.4 L200,29.8 L208,31.4 L216,32 L224,28.7 L232,30.1 L240,32.2 L248,31.8 L256,28.9 L264,30.6 L272,30.1 L280,29.1 L288,28.7 L296,28.5 L304,28.9 L312,31.6 L320,28.8 L328,29.8 L336,30.2 L344,28.8 L352,29.9 L360,29.6 L368,30.1 L376,30.5 L384,27.9 L392,30.8 L400,29.9 L408,29.9 L416,28.7 L424,29.3 L432,30.3 L440,29 L448,30.4 L456,30.4 L464,29.4 L472,31 L480,28.1 L488,28 L496,29 L504,28.5 L512,29.6 L520,29.3 L528,29.3 L536,28.7 L544,29.9 L552,31.9 L560,30 L568,32.1 L576,30.7 L584,31.6 L592,30.2 L600,30.7 L608,31.2 L616,29.3 L624,29.7 L632,30.4 L640,30.6 L648,29.2 L656,30.4 L664,28.8 L672,27.1 L680,26 L688,28.7 L696,28.5 L704,25.4 L712,24.9 L720,24.3 L728,23.3 L736,25.8 L744,23 L752,24.7 L760,22.6 L768,22.8 L776,20.7 L784,20.4 L792,21.7 L800,19.8 L808,20.6 L816,17.8 L824,20 L832,17.9 L840,19.6 L848,16.1 L856,17.2 L864,18.2 L872,16.4 L880,16.7 L888,18.5 L896,15.4 L904,17.7 L912,18.6 L920,18.2 L928,18.3 L936,16.4 L944,19.2 L952,19.9 L960,20.3 L968,19.8 L976,20.4 L984,21.3 L992,21.3 L1000,21.1 L1008,20.6 L1016,21.6 L1024,23.4 L1032,23.1 L1040,22.1 L1048,25.2 L1056,23.1 L1064,24.2 L1072,24.3 L1080,25.7 L1088,25.6 L1096,25.6 L1104,28.5 L1112,27.8 L1120,26.9 L1128,29.5 L1136,28.6 L1144,29.7 L1152,30.1 L1160,29.5 L1168,28.3 L1176,31.7 L1184,32 L1192,31.4 L1200,28.9 L1208,30.5 L1216,29.8 L1224,30.1 L1232,30 L1240,32 L1248,29.9 L1256,28.5 L1264,29.2 L1272,29.7 L1280,31.2 L1288,29.8 L1296,31.1 L1304,28.9 L1312,28.3 L1320,28.6 L1328,30.3 L1336,29.8 L1344,30.8 L1352,29.9 L1360,28.8 L1368,28.7 L1376,29.1 L1384,30.3 L1392,30.6 L1400,29.4 L1408,28.7 L1416,27.7 L1424,28.7 L1432,29 L1440,28.2 L1440,0 Z";

const SAGE_BOTTOM_PAPER = "M0,0 L0,21.3 L8,23.4 L16,22.4 L24,22.1 L32,22.5 L40,23.7 L48,22.4 L56,23.8 L64,25.5 L72,23.7 L80,25.5 L88,25.8 L96,23.9 L104,25.4 L112,26 L120,24.5 L128,25.1 L136,24.2 L144,23.6 L152,22.7 L160,25.3 L168,22.7 L176,23 L184,24 L192,23.4 L200,24.3 L208,21.7 L216,23.6 L224,24.4 L232,23.5 L240,21.4 L248,21.5 L256,23.9 L264,21.7 L272,23.9 L280,24.3 L288,22.6 L296,22.7 L304,22.7 L312,22 L320,22.7 L328,24 L336,24.7 L344,25.5 L352,22.6 L360,25.2 L368,25.3 L376,23.5 L384,24.9 L392,23.6 L400,24.4 L408,25.1 L416,25.2 L424,23.3 L432,23.8 L440,24.5 L448,25.1 L456,25.8 L464,23 L472,24.1 L480,22 L488,22.1 L496,21.9 L504,24.5 L512,23.2 L520,23.3 L528,20.6 L536,20.8 L544,19.5 L552,18.9 L560,20 L568,18.8 L576,17.5 L584,18.6 L592,19.4 L600,17.7 L608,14.9 L616,15.7 L624,14.3 L632,13.9 L640,12.9 L648,12.3 L656,13.6 L664,12.6 L672,13.2 L680,12.1 L688,12.7 L696,11.7 L704,10.9 L712,11.3 L720,12.6 L728,11.6 L736,10 L744,10.6 L752,12.1 L760,10.1 L768,10.5 L776,10.4 L784,13.2 L792,10.4 L800,11.5 L808,13.7 L816,11.6 L824,13.2 L832,12.9 L840,15.5 L848,13.4 L856,15.8 L864,16.5 L872,16.9 L880,16.6 L888,19.4 L896,18.2 L904,20.2 L912,18.5 L920,18.5 L928,21 L936,22.3 L944,22.7 L952,20.4 L960,21.6 L968,21.7 L976,23.2 L984,24.8 L992,24 L1000,23.8 L1008,22.9 L1016,23.8 L1024,23.8 L1032,24.2 L1040,22.8 L1048,24.5 L1056,23.3 L1064,26 L1072,24 L1080,25.2 L1088,24.2 L1096,23.8 L1104,24.4 L1112,22.5 L1120,25.4 L1128,22.4 L1136,22.6 L1144,23.3 L1152,24.3 L1160,22.3 L1168,22.7 L1176,24.6 L1184,23.3 L1192,21.4 L1200,24.8 L1208,23.5 L1216,24.6 L1224,22.8 L1232,24.5 L1240,23.1 L1248,23.8 L1256,24.1 L1264,21.9 L1272,22 L1280,23.8 L1288,22.5 L1296,22.5 L1304,25.1 L1312,22.8 L1320,23 L1328,25.7 L1336,24.1 L1344,25.1 L1352,23.7 L1360,24.3 L1368,23.1 L1376,23.8 L1384,24.8 L1392,25.3 L1400,24 L1408,23.5 L1416,22.7 L1424,25.7 L1432,25.4 L1440,23.7 L1440,0 Z";

const HERO_TORN_WINDOW = "M476.9,320 L474.1,340.6 L472.7,361 L462.6,379.7 L455.3,398.2 L446.7,415.5 L433.2,430.1 L424.9,445.8 L419.3,462.9 L409,476.6 L401.5,492.2 L396.4,510 L387.5,524.7 L377.5,538.4 L365.6,549.4 L353.8,560.4 L341.5,570.4 L327.3,576.1 L315,586.7 L300.7,591.2 L286.8,597.8 L272.9,607.2 L257.7,611.2 L242.3,610.7 L226.6,611.8 L210.9,610.8 L196.7,601.9 L182.8,593.3 L170.4,581.8 L158.5,570.4 L149.5,554.7 L140.3,540.7 L130.2,528.5 L121.5,514.7 L110.9,503 L99.8,491 L87.8,479 L75.6,466.1 L63.5,452 L54.6,435.5 L45.5,418.4 L42.9,398.7 L38.3,379.5 L32.8,360.3 L34.8,339.9 L34.4,320 L33.5,300 L33.6,279.8 L38.9,260.6 L42.9,241.3 L44.4,221.2 L56.1,205.2 L62.2,187.3 L76.5,174.5 L86.9,160.4 L100.1,149.2 L109.9,136.1 L120.4,124.1 L131,112.5 L138.9,97.2 L150.1,86.4 L159.8,72.1 L170,57.1 L182.5,45.6 L195.7,34.2 L210.7,28 L226.3,24.9 L242.2,25.8 L257.6,31.7 L272.8,33.5 L286.9,42 L301.5,45.7 L314.7,54.4 L328.6,60.5 L341.1,70.2 L354.5,78.5 L364.5,92.3 L377.2,102.1 L384.7,118.3 L394.6,131.7 L403.5,146.2 L410.1,162.5 L420,176.7 L427,193 L434.8,209.2 L443.8,225.5 L453.4,242.4 L463.2,260.1 L472.3,279 L477.5,299.2 Z";

const MOUNTAIN_RIP_TOP = "M0,0 L0,115.2 L10,113.4 L20,114.5 L30,114.8 L40,112.3 L50,114.1 L60,114.9 L70,113.5 L80,112.6 L90,113.1 L100,110.8 L110,107.9 L120,107.5 L130,106.2 L140,105.9 L150,107.9 L160,105.7 L170,104.7 L180,104.3 L190,103.1 L200,102 L210,102.6 L220,100.4 L230,99.7 L240,100.6 L250,99.1 L260,99.5 L270,95.7 L280,97 L290,94.8 L300,93.6 L310,95.4 L320,95.2 L330,91.7 L340,91.8 L350,94.1 L360,91.4 L370,91.6 L380,88.8 L390,90.2 L400,88.3 L410,85.1 L420,85.7 L430,83.7 L440,80.5 L450,79.6 L460,79.5 L470,77 L480,77.9 L490,73.6 L500,72.5 L510,70.6 L520,72.2 L530,69.2 L540,67.8 L550,69.2 L560,65 L570,67.5 L580,66.8 L590,66 L600,63.7 L610,62.8 L620,62 L630,62.1 L640,62.9 L650,62.6 L660,64.3 L670,64.7 L680,65.4 L690,63.8 L700,65.4 L710,67.6 L720,69.8 L730,70.4 L740,70.4 L750,71.4 L760,68.7 L770,70.9 L780,69.8 L790,73.6 L800,70.4 L810,70.2 L820,70.3 L830,70.1 L840,70.1 L850,72.3 L860,71.7 L870,71.1 L880,69.2 L890,68.9 L900,66.8 L910,66.9 L920,63.5 L930,63.4 L940,59.5 L950,61.6 L960,58.9 L970,57 L980,53.2 L990,55.2 L1000,53.4 L1010,52.6 L1020,50.6 L1030,46.7 L1040,45.5 L1050,46.8 L1060,46.9 L1070,45.8 L1080,41.7 L1090,43.6 L1100,43.2 L1110,40.8 L1120,38.5 L1130,39.2 L1140,37.7 L1150,36.8 L1160,39.3 L1170,37.8 L1180,36.2 L1190,36.7 L1200,34.5 L1210,34 L1220,33.2 L1230,33.2 L1240,31.7 L1250,34 L1260,31.7 L1270,31 L1280,29.1 L1290,27.6 L1300,29.7 L1310,28.2 L1320,26.8 L1330,25.7 L1340,25.2 L1350,23.2 L1360,24.9 L1370,22 L1380,22.8 L1390,21.3 L1400,20.7 L1410,19.5 L1420,20.7 L1430,22.9 L1440,23.1 L1440,0 Z";

const MOUNTAIN_RIP_DECKLE = "M0,0 L0,121.9 L10,119 L20,119.5 L30,121 L40,116.9 L50,118.7 L60,116.7 L70,116.1 L80,114.4 L90,115 L100,110.4 L110,108.5 L120,109.7 L130,105.9 L140,107.3 L150,103.1 L160,100.8 L170,100.8 L180,101.1 L190,97 L200,98.9 L210,93.9 L220,96.5 L230,91.7 L240,91.2 L250,93.2 L260,88.9 L270,90.8 L280,88.7 L290,88 L300,86.1 L310,88.5 L320,86.6 L330,86.7 L340,86 L350,86 L360,86 L370,82.6 L380,83.7 L390,81.4 L400,83.9 L410,81.2 L420,82.4 L430,79.3 L440,80 L450,78.7 L460,78.5 L470,78 L480,76.1 L490,75.4 L500,76.9 L510,76.3 L520,71.9 L530,74.8 L540,73.5 L550,74 L560,73.5 L570,69.5 L580,71.4 L590,70.8 L600,70.1 L610,70.1 L620,72.7 L630,69.1 L640,71.7 L650,72.6 L660,71.9 L670,73.7 L680,72 L690,72 L700,73.3 L710,72.2 L720,74.7 L730,75.9 L740,74.4 L750,77.1 L760,74.6 L770,75.8 L780,76.5 L790,74.8 L800,73.8 L810,74.2 L820,73.8 L830,73.8 L840,71.8 L850,69.2 L860,69.5 L870,67 L880,66.9 L890,62.7 L900,61.8 L910,60.7 L920,59.4 L930,58.1 L940,56.9 L950,53.9 L960,50.3 L970,49.6 L980,48.4 L990,44.4 L1000,45 L1010,44.8 L1020,42.6 L1030,41.1 L1040,41.2 L1050,38.7 L1060,39.7 L1070,35.5 L1080,38.5 L1090,34.6 L1100,37.1 L1110,35.6 L1120,35.3 L1130,35.7 L1140,35.3 L1150,35 L1160,36.5 L1170,35 L1180,35.2 L1190,36.8 L1200,36.1 L1210,37.1 L1220,33.9 L1230,35.7 L1240,34.1 L1250,37.3 L1260,35.5 L1270,35.7 L1280,36.6 L1290,33 L1300,35.7 L1310,33.4 L1320,34 L1330,31.7 L1340,33.6 L1350,32.3 L1360,29.7 L1370,31 L1380,29.9 L1390,27.6 L1400,27.7 L1410,28.5 L1420,27.2 L1430,29.3 L1440,26.1 L1440,0 Z";

export default function NairuthyaCampaignClient({ project }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

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

  const holdings = [
    {
      id: 'retreat-6k',
      title: 'Individual Therapy',
      subtitle: '6,000 sq.ft Parcel',
      description: 'A safe, tranquil space to explore your thoughts and plant deep rural roots.',
      badge: 'Individual Khata'
    },
    {
      id: 'estate-10k',
      title: 'Couples Sanctuary',
      subtitle: '10,000 sq.ft Estate',
      description: 'Build stronger, healthier agrarian relationships with private coconut and fruit groves.',
      badge: 'Estate Boundary'
    },
    {
      id: 'acre-hillside',
      title: 'Adolescent Heritage',
      subtitle: 'Contoured Acre',
      description: 'Guidance for a brighter, more confident future across elevated stone terraces.',
      badge: 'Scenic Elevation'
    },
    {
      id: 'farm-care',
      title: 'Stress & Anxiety Relief',
      subtitle: 'Turnkey Farm Care',
      description: 'Comprehensive agricultural stewardship tools to help you feel calmer and in control.',
      badge: 'Full Agrarian Care'
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
          SECTION 1: HERO - MATCHING IMAGE 3 EXACTLY
          ========================================================================= */}
      <section
        id="hero"
        className="relative w-full pt-10 sm:pt-14 pb-16 sm:pb-22 z-10"
        aria-label="Welcome to Nairuthya Whispering Wood"
      >
        {/* Botanical Foliage Peeking from Far Left Margin (Matching Image 3) */}
        <div className="absolute top-24 -left-14 w-44 h-44 pointer-events-none opacity-85 z-0 hidden lg:block transform -rotate-12">
          <Image
            src="/images/campaign/botanical_leaves.png"
            alt="Botanical Leaf Foliage"
            width={220}
            height={220}
            className="object-contain"
          />
        </div>

        <Container size="default" className="relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Handwritten Doodle, Display Headline, Buttons & 3 Badges */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              
              {/* Handwritten Note Accent with Leaf Doodle (Matching Image 3) */}
              <MotionReveal delay={0.05}>
                <div className="inline-flex items-center gap-2">
                  <span className="font-serif italic text-lg sm:text-xl text-[#3E503F] tracking-wide">
                    A calmer mind, A brighter you
                  </span>
                  <svg className="w-5 h-5 text-[#3E503F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 2C7 2 3 7 3 12c0 5 4 9 9 9 1-3 2-6 5-8 3-2 5-4 5-7 0-3-4-6-10-4z" />
                    <path d="M12 12c2-2 4-5 4-8" />
                  </svg>
                </div>
              </MotionReveal>

              {/* Literary Serif Headline with Hand-Drawn Stroke Underline (Matching Image 3) */}
              <MotionReveal delay={0.1}>
                <div className="relative inline-block">
                  <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.2rem] font-normal text-[#1E2E20] tracking-tight leading-[1.12]">
                    Farmland for a Healthier, Happier You
                  </h1>
                  {/* Subtle Hand-Drawn Stroke Underline */}
                  <svg
                    className="w-48 sm:w-64 h-3 sm:h-4 text-[#C9A86A]/75 mt-1 sm:mt-2"
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
                </div>
              </MotionReveal>

              {/* Warm Subtitle */}
              <MotionReveal delay={0.15}>
                <p className="font-sans text-base sm:text-lg text-[#556455] leading-relaxed max-w-xl font-normal">
                  A safe, supportive space to talk, heal, and grow &mdash; because your connection to the earth and your mental well-being matter.
                </p>
              </MotionReveal>

              {/* Dual CTA Buttons (Matching Image 3) */}
              <MotionReveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    id="hero-inquire-cta"
                    type="button"
                    onClick={scrollToForm}
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-[#263828] hover:bg-[#1A281B] active:scale-[0.98] text-white font-sans font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md cursor-pointer"
                  >
                    <span>Book a Consultation &rarr;</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('stewardship')}
                    className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-full bg-[#FAF8F3] hover:bg-white border border-[#DDD3C2] text-[#243525] font-sans font-medium text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#E5ECE2] flex items-center justify-center text-[#263828]">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </span>
                    <span>How it works</span>
                  </button>
                </div>
              </MotionReveal>

              {/* 3 Circular Handcrafted Badge Pills (Matching Image 3) */}
              <MotionReveal delay={0.25}>
                <div className="pt-6 sm:pt-8 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg border-t border-[#DFD7C7]">
                  
                  {/* Badge 1: Confidential & Safe */}
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-[#FAF8F3] border border-[#DDD3C2] flex items-center justify-center text-[#263828] shadow-sm">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M12 2C6.5 2 2 6.5 2 12c0 5.5 4.5 10 10 10 2-3 3-7 6-9 3-2 4-4 4-7 0-3-3.5-6-8-4z" />
                        <path d="M12 12c1.5-2 3-5 3-8" />
                      </svg>
                    </div>
                    <span className="font-serif text-xs sm:text-sm text-[#243525] leading-tight font-medium">
                      Confidential<br />&amp; Safe
                    </span>
                  </div>

                  {/* Badge 2: Qualified Stewards */}
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-[#FAF8F3] border border-[#DDD3C2] flex items-center justify-center text-[#263828] shadow-sm">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M12 22v-8m0 0c-3-3-3-7 0-10 3 3 3 7 0 10z" />
                        <path d="M12 14c-4-1-6-4-6-7 3 0 5 1 6 3" />
                        <path d="M12 14c4-1 6-4 6-7-3 0-5 1-6 3" />
                      </svg>
                    </div>
                    <span className="font-serif text-xs sm:text-sm text-[#243525] leading-tight font-medium">
                      Qualified<br />Stewards
                    </span>
                  </div>

                  {/* Badge 3: Personalised Care */}
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-[#FAF8F3] border border-[#DDD3C2] flex items-center justify-center text-[#263828] shadow-sm">
                      <svg className="w-5 h-5 text-[#263828]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                    <span className="font-serif text-xs sm:text-sm text-[#243525] leading-tight font-medium">
                      Personalised<br />Care
                    </span>
                  </div>

                </div>
              </MotionReveal>

            </div>

            {/* Right Column: ORGANIC TORN-PAPER PHOTO OPENING (Matching Image 3) */}
            <div className="lg:col-span-5 relative">
              <MotionReveal delay={0.2}>
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  
                  {/* Botanical Eucalyptus Branch Overlapping Top-Left Torn Edge (Matching Image 3) */}
                  <div className="absolute -top-12 -left-12 w-48 h-48 z-30 pointer-events-none transform -rotate-[12deg]">
                    <Image
                      src="/images/campaign/botanical_leaves.png"
                      alt="Botanical Eucalyptus Branch"
                      width={240}
                      height={240}
                      className="object-contain drop-shadow-[0_8px_16px_rgba(40,45,30,0.22)]"
                    />
                  </div>

                  {/* Pinned Kraft Sticky Note with Washi Tape on Top-Right (Matching Image 3) */}
                  <div className="absolute -top-5 -right-3 sm:-top-7 sm:-right-4 z-40 transform rotate-[3.5deg]">
                    <div className="w-20 h-5 bg-[#D8D0BE]/85 backdrop-blur-[1px] rotate-[-2deg] mx-auto -mb-2.5 border-t border-b border-white/60 shadow-sm" />
                    <div className="p-3.5 sm:p-4 rounded-xl bg-[#E6DEC8] border border-[#D2C5AC] shadow-md text-center">
                      <span className="font-serif italic text-xs sm:text-sm text-[#3E4F3F] block leading-tight">
                        It&apos;s okay<br />to take<br />a pause 🌿
                      </span>
                    </div>
                  </div>

                  {/* THE VECTOR ORGANIC TORN PAPER OPENING */}
                  <div className="relative w-full aspect-[500/640] drop-shadow-[0_16px_36px_rgba(50,40,25,0.2)]">
                    <svg viewBox="0 0 500 640" className="w-full h-full overflow-visible">
                      <defs>
                        <clipPath id="hero-torn-clip">
                          <path d={HERO_TORN_WINDOW} />
                        </clipPath>
                      </defs>

                      {/* Clipped Real Project Photography */}
                      <image
                        href="https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood/hero.jpg"
                        x="0"
                        y="0"
                        width="500"
                        height="640"
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#hero-torn-clip)"
                      />

                      {/* The Realistic White Fibrous Deckle Edge Torn Paper Border */}
                      <path
                        d={HERO_TORN_WINDOW}
                        fill="none"
                        stroke="#FAF6EE"
                        strokeWidth="10"
                        strokeLinejoin="round"
                        style={{ filter: 'drop-shadow(0 2px 5px rgba(40,30,20,0.25))' }}
                      />
                      {/* Inner Fine Fiber Highlight */}
                      <path
                        d={HERO_TORN_WINDOW}
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="4"
                        strokeLinejoin="round"
                        opacity="0.85"
                      />
                    </svg>

                    {/* Real Photography Tag at bottom of photo opening */}
                    <div className="absolute bottom-10 left-10 right-10 text-white flex items-center justify-between text-xs z-20 pointer-events-none drop-shadow-md">
                      <span className="font-serif text-sm">Honnasandra, Nelamangala</span>
                      <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] uppercase font-sans tracking-wider border border-white/25">
                        Actual Site
                      </span>
                    </div>
                  </div>

                </div>
              </MotionReveal>
            </div>

          </div>
        </Container>
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
        aria-label="Real Support for Real Life"
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
            
            {/* Left Content (Matching Image 4) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <MotionReveal delay={0.05}>
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#364937] font-semibold block">
                  MORE THAN JUST CONVERSATIONS
                </span>
              </MotionReveal>

              <MotionReveal delay={0.1}>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#172719] tracking-tight leading-tight">
                  Real Support for Real Life
                </h2>
              </MotionReveal>

              <MotionReveal delay={0.15}>
                <p className="font-sans text-sm sm:text-base text-[#2C3E2D] leading-relaxed max-w-xl font-normal">
                  Life can be overwhelming, but you don&apos;t have to figure it out alone. Our stewardship and turnkey farmland care are designed to help you navigate challenges, build resilience, and create a more fulfilling life.
                </p>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#263828] hover:bg-[#1A281B] active:scale-[0.98] text-white font-sans font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md cursor-pointer"
                  >
                    <span>Learn More &rarr;</span>
                  </button>
                </div>
              </MotionReveal>
            </div>

            {/* Right Icons: 3 Circular Badges in a Row (Matching Image 4) */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3 sm:gap-4 text-center relative">
              
              <MotionReveal delay={0.15}>
                <div className="flex flex-col items-center space-y-2.5">
                  <div className="w-16 h-16 rounded-full bg-[#C8D7C2] border border-[#A7B9A0] flex items-center justify-center text-[#1E2E20] shadow-sm">
                    <Sun className="w-7 h-7 text-[#1E2E20]" />
                  </div>
                  <span className="font-serif text-xs sm:text-sm text-[#172719] font-medium leading-snug">
                    Manage Stress<br />&amp; Anxiety
                  </span>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <div className="flex flex-col items-center space-y-2.5">
                  <div className="w-16 h-16 rounded-full bg-[#C8D7C2] border border-[#A7B9A0] flex items-center justify-center text-[#1E2E20] shadow-sm">
                    <Sprout className="w-7 h-7 text-[#1E2E20]" />
                  </div>
                  <span className="font-serif text-xs sm:text-sm text-[#172719] font-medium leading-snug">
                    Build Self-<br />Confidence
                  </span>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.25}>
                <div className="flex flex-col items-center space-y-2.5">
                  <div className="w-16 h-16 rounded-full bg-[#C8D7C2] border border-[#A7B9A0] flex items-center justify-center text-[#1E2E20] shadow-sm">
                    <Users className="w-7 h-7 text-[#1E2E20]" />
                  </div>
                  <span className="font-serif text-xs sm:text-sm text-[#172719] font-medium leading-snug">
                    Improve<br />Relationships
                  </span>
                </div>
              </MotionReveal>

            </div>

            {/* Hand-Drawn Botanical Ink Branch on Far Right Margin (Matching Image 4) */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none opacity-85 hidden lg:block z-0">
              <Image
                src="/images/campaign/botanical_ink_branch.png"
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
          SECTION 3: 4 DECKLE CARDS - MATCHING IMAGE 5 TOP
          ========================================================================= */}
      <section
        id="holdings"
        className="relative w-full py-20 sm:py-28 z-10"
        aria-label="Our Farmland Services"
      >
        {/* Botanical Leaf Sprig in Left Margin (Matching Image 5) */}
        <div className="absolute -left-12 top-24 w-48 h-48 pointer-events-none z-0 transform -rotate-[25deg] hidden lg:block">
          <Image
            src="/images/campaign/botanical_leaves.png"
            alt="Botanical Leaf Foliage"
            width={240}
            height={240}
            className="object-contain opacity-90"
          />
        </div>

        <Container size="default" className="relative z-10">
          <div className="max-w-6xl mx-auto space-y-12 sm:space-y-14">
            
            {/* Header with Handwritten Doodle (Matching Image 5) */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <MotionReveal delay={0.05}>
                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#786E5E] font-semibold block">
                    OUR SERVICES
                  </span>
                </MotionReveal>

                <MotionReveal delay={0.1}>
                  <div className="relative inline-block">
                    <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#243525] tracking-tight">
                      Support for Every Chapter of Your Life 🌿
                    </h2>
                    {/* Subtle Hand-Drawn Stroke Underline */}
                    <svg
                      className="w-40 sm:w-56 h-3 text-[#C9A86A]/75 mt-1"
                      viewBox="0 0 200 12"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2,8 Q50,3 100,7 Q150,11 198,5"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </MotionReveal>
              </div>

              {/* Right Side Handwritten Arrow Note (Matching Image 5) */}
              <MotionReveal delay={0.15}>
                <div className="flex items-center gap-2 self-start md:self-end">
                  <div className="text-right">
                    <span className="font-serif italic text-base sm:text-lg text-[#4A5F4B] block leading-tight">
                      Small steps<br />Big changes
                    </span>
                  </div>
                  {/* Curved Hand-Drawn Arrow */}
                  <svg className="w-8 h-8 text-[#4A5F4B] transform rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M14 4c4 4 4 10 0 14m0 0l-3-3m3 3l-3 3" />
                  </svg>
                </div>
              </MotionReveal>
            </div>

            {/* 4 Cards (Matching Image 5 Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {holdings.map((h, i) => (
                <MotionReveal key={h.id} delay={0.1 + i * 0.05}>
                  <div className="rounded-3xl bg-[#FAF8F3] border border-[#DDD3C2] p-6 sm:p-7 shadow-[0_6px_20px_rgba(60,50,35,0.06)] flex flex-col justify-between h-full space-y-6 hover:-translate-y-1 transition-transform duration-200">
                    
                    <div className="space-y-4">
                      {/* Circular Pebble Icon Badge */}
                      <div className="w-14 h-14 rounded-full bg-[#EAE2D3] border border-[#D5CABB] flex items-center justify-center text-[#263828] shadow-sm">
                        {i === 0 && (
                          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <path d="M12 2C6.5 2 2 6.5 2 12c0 5.5 4.5 10 10 10 2-3 3-7 6-9 3-2 4-4 4-7 0-3-3.5-6-8-4z" />
                          </svg>
                        )}
                        {i === 1 && (
                          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <circle cx="10" cy="12" r="6" />
                            <circle cx="14" cy="12" r="6" opacity="0.6" />
                          </svg>
                        )}
                        {i === 2 && (
                          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <ellipse cx="12" cy="7" rx="4" ry="2" />
                            <ellipse cx="12" cy="12" rx="6" ry="2.5" />
                            <ellipse cx="12" cy="17" rx="8" ry="3" />
                          </svg>
                        )}
                        {i === 3 && (
                          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="M9 12l2 2 4-4" />
                          </svg>
                        )}
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1.5">
                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#243525]">
                          {h.title}
                        </h3>
                        <span className="text-[11px] font-sans text-[#786E5E] block font-medium">
                          {h.subtitle}
                        </span>
                        <p className="font-sans text-xs sm:text-sm text-[#5E6B5D] leading-relaxed pt-1">
                          {h.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action: Round Arrow Button (Matching Image 5) */}
                    <div className="pt-2 flex items-center justify-between border-t border-[#E8DFC8]">
                      <span className="font-serif italic text-xs text-[#4A5F4B]">
                        {h.badge}
                      </span>
                      <button
                        type="button"
                        onClick={scrollToForm}
                        aria-label={`Enquire about ${h.title}`}
                        className="w-8 h-8 rounded-full bg-[#EFE8DC] border border-[#DDD3C2] flex items-center justify-center text-[#243525] hover:bg-[#263828] hover:text-white transition-colors cursor-pointer"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </MotionReveal>
              ))}
            </div>

          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4: TESTIMONIAL & TORN MOUNTAIN HORIZON - MATCHING IMAGE 5 BOTTOM
          ========================================================================= */}
      <section
        id="perspectives"
        className="relative w-full pt-16 pb-0 overflow-hidden"
        aria-label="Sanctuary Vista & Resident Story"
      >
        {/* Testimonial Quote & Angled Note on Clean Canvas (Matching Image 5) */}
        <Container size="default" className="relative z-10 pb-12 sm:pb-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            
            {/* Left 7 cols: Testimonial Quote directly on Paper (Matching Image 5) */}
            <div className="md:col-span-7 space-y-4">
              <MotionReveal delay={0.05}>
                {/* Big Quote Mark */}
                <span className="font-serif text-6xl sm:text-7xl text-[#243525] block leading-none font-bold">
                  &ldquo;
                </span>
                
                {/* Quote Paragraph */}
                <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#243525] leading-relaxed font-normal">
                  &ldquo;Therapy here has been life-changing. I feel more in control, more positive, and truly heard.&rdquo;
                </blockquote>

                {/* Author Avatar, Name, Stars & Pagination Arrows (Matching Image 5) */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#DFD7C7] max-w-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#DCD3C2] border border-[#C5BBAA] flex items-center justify-center font-serif text-[#243525] font-semibold text-sm">
                      AM
                    </div>
                    <div>
                      <span className="font-serif font-medium text-sm text-[#243525] block">
                        Aarav S.
                      </span>
                      <div className="flex text-[#C9A86A] text-xs tracking-widest">
                        ★★★★★
                      </div>
                    </div>
                  </div>

                  {/* Pagination Circles (←) (→) (Matching Image 5) */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous quote"
                      className="w-8 h-8 rounded-full bg-[#FAF8F3] border border-[#D5CABB] flex items-center justify-center text-[#243525] hover:bg-[#263828] hover:text-white transition-colors cursor-pointer"
                    >
                      &larr;
                    </button>
                    <button
                      type="button"
                      aria-label="Next quote"
                      className="w-8 h-8 rounded-full bg-[#FAF8F3] border border-[#D5CABB] flex items-center justify-center text-[#243525] hover:bg-[#263828] hover:text-white transition-colors cursor-pointer"
                    >
                      &rarr;
                    </button>
                  </div>
                </div>
              </MotionReveal>
            </div>

            {/* Right 5 cols: Ink Botanical Branch & Angled Note with Washi Tape (Matching Image 5) */}
            <div className="md:col-span-5 flex items-center justify-center md:justify-end gap-6 relative">
              
              {/* Hand-Drawn Ink Botanical Branch Illustration */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 pointer-events-none opacity-85 transform -rotate-12">
                <Image
                  src="/images/campaign/botanical_ink_branch.png"
                  alt="Botanical Ink Drawing"
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>

              {/* Angled Pinned Note (Matching Image 5) */}
              <MotionReveal delay={0.15}>
                <div className="transform rotate-[3deg] text-center max-w-[200px]">
                  {/* Green Washi Tape */}
                  <div className="w-20 h-5 bg-[#A7B9A0]/85 backdrop-blur-[1px] rotate-[-2deg] mx-auto -mb-2.5 border-t border-b border-white/60 shadow-sm" />
                  
                  <div className="p-4 rounded-xl bg-[#E6DEC8] border border-[#D2C5AC] shadow-md text-[#243525] space-y-1">
                    <span className="font-serif italic text-base sm:text-lg text-[#243525] block leading-tight">
                      A brighter<br />tomorrow<br />is possible. 🌿
                    </span>
                    <span className="font-sans text-[10px] text-[#5E6B5D] block pt-1">
                      Honnasandra Valley
                    </span>
                  </div>
                </div>
              </MotionReveal>

            </div>

          </div>
        </Container>

        {/* =====================================================================
            ORGANIC TORN PAPER RIP REVEALING MOUNTAIN PANORAMA (Matching Image 5)
            ===================================================================== */}
        <div className="relative w-full">
          
          {/* Top Multi-Layer Jagged Torn Paper Rip Across Photo */}
          <div className="relative w-full overflow-hidden leading-none z-20 pointer-events-none">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-10 sm:h-16">
              {/* White deckle paper fiber under-layer */}
              <path
                d={MOUNTAIN_RIP_DECKLE}
                fill="#FAF6EE"
                style={{ filter: 'drop-shadow(0 4px 5px rgba(35,30,20,0.22))' }}
              />
              {/* Kraft Paper Layer */}
              <path
                d={MOUNTAIN_RIP_TOP}
                fill="#F5EFE6"
              />
            </svg>
          </div>

          {/* Panoramic Landscape Photo */}
          <div className="relative w-full h-72 sm:h-96 -mt-4">
            <Image
              src="https://res.cloudinary.com/yffbj6hj/image/upload/v1791200705/earth-heritage/projects/nairuthya-whispering-wood/elevated-vista.jpg"
              alt="Elevated sunset vista over the green trees and hills at Nairuthya Whispering Wood"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Subtle atmospheric gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

            {/* Bottom Photo Caption */}
            <div className="absolute bottom-6 left-6 sm:left-12 text-white font-serif text-sm drop-shadow-md z-10 pointer-events-none">
              <span>Honnasandra Valley Sanctuary &bull; 8-Acre Managed Timber &amp; Fruit Orchard</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: ARTISANAL CONCIERGE FORM CARD
          ========================================================================= */}
      <NairuthyaCampaignForm />

      {/* =========================================================================
          SECTION 6: REGIONAL WAYFINDING & LOCATION
          ========================================================================= */}
      <section
        id="location"
        className="relative w-full py-20 sm:py-28 z-10"
        aria-label="Location & Wayfinding"
      >
        <Container size="default">
          <div className="max-w-6xl mx-auto space-y-12 sm:space-y-14">
            
            <div className="max-w-2xl space-y-3">
              <MotionReveal delay={0.05}>
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#786E5E] font-semibold block">
                  REGIONAL WAYFINDING
                </span>
              </MotionReveal>

              <MotionReveal delay={0.1}>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#243525] tracking-tight">
                  Easy Access from Bengaluru
                </h2>
              </MotionReveal>

              <MotionReveal delay={0.15}>
                <p className="font-sans text-sm sm:text-base text-[#5E6B5D] leading-relaxed">
                  Located in the quiet rural belt of Honnasandra, Nelamangala Taluk. Insulated from highway noise yet rapidly accessible via National Highway 48.
                </p>
              </MotionReveal>
            </div>

            {/* Grid: 4 Travel Badges + Interactive Map */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* 4 Distance Cards (5 cols) */}
              <div className="lg:col-span-5 space-y-3.5 flex flex-col justify-between">
                
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-[#DDD3C2] shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-[#263828] font-semibold">08 KM &bull; ~10 MINS</span>
                    <span className="text-[#786E5E]">NH-48</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#243525]">Nelamangala Toll Plaza</h3>
                  <p className="text-xs text-[#5E6B5D]">Direct connection to Doddaballapur bypass road.</p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-[#DDD3C2] shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-[#263828] font-semibold">22 KM &bull; ~25 MINS</span>
                    <span className="text-[#786E5E]">Elevated Corridor</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#243525]">Peenya Hub &amp; Metro Terminal</h3>
                  <p className="text-xs text-[#5E6B5D]">Seamless 6-lane elevated expressway access.</p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-[#DDD3C2] shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-[#263828] font-semibold">30 KM &bull; ~35 MINS</span>
                    <span className="text-[#786E5E]">West Bengaluru</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#243525]">Goraguntepalya &amp; Yeshwanthpur</h3>
                  <p className="text-xs text-[#5E6B5D]">Direct connectivity from Central Bengaluru.</p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-[#DDD3C2] shadow-sm space-y-1">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-[#263828] font-semibold">38 KM &bull; ~45 MINS</span>
                    <span className="text-[#786E5E]">North Corridor</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#243525]">Hebbal Flyover &amp; Manyata Park</h3>
                  <p className="text-xs text-[#5E6B5D]">Connected via Outer Ring Road &amp; NICE network.</p>
                </div>

              </div>

              {/* Map Embed (7 cols) */}
              <div className="lg:col-span-7">
                <div className="h-full min-h-[400px] rounded-3xl overflow-hidden border border-[#DDD3C2] bg-[#EAE2D3] shadow-sm relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.00800222693!2d77.33212307359022!3d13.03516221348457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae310049c2514b%3A0x31df4bed6b535bbd!2sWhispering%20Wood%20by%20Nairuthya%20Properties!5e0!3m2!1sen!2sin!4v1790763247598!5m2!1sen!2sin"
                    title="Nairuthya Whispering Wood Location Map"
                    className="w-full h-full border-0 absolute inset-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>

            </div>

          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 7: FAQ ACCORDION (FIELD NOTES STYLE)
          ========================================================================= */}
      <section
        id="faq"
        className="relative w-full py-20 sm:py-28 z-10"
        aria-label="Frequently Asked Questions"
      >
        <Container size="default">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="text-center space-y-3">
              <MotionReveal delay={0.05}>
                <span className="font-serif italic text-base text-[#4A5F4B] block">
                  Questions &amp; answers 🌿
                </span>
              </MotionReveal>

              <MotionReveal delay={0.1}>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#243525] tracking-tight">
                  Frequently Addressed Enquiries
                </h2>
              </MotionReveal>
            </div>

            {/* Accordion */}
            <div className="divide-y divide-[#D6CDBC] border-y border-[#D6CDBC]">
              {faqs.map((faq, idx) => {
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
                        <span className="font-serif italic text-base text-[#C9A86A]">0{idx + 1}</span>
                        <h3 className="font-serif text-lg sm:text-xl font-normal text-[#243525] group-hover:text-[#4A5F4B] transition-colors">
                          {faq.q}
                        </h3>
                      </div>
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-[#786E5E] shrink-0 transition-transform duration-200',
                          isOpen ? 'rotate-180 text-[#263828]' : ''
                        )}
                      />
                    </button>

                    {isOpen && (
                      <div className="pt-3.5 pl-8 sm:pl-9 pr-4">
                        <p className="font-sans text-sm sm:text-base text-[#5E6B5D] leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Callout */}
            <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#DDD3C2] text-center space-y-4 shadow-sm">
              <h3 className="font-serif text-2xl font-normal text-[#243525]">
                Ready to Experience Nairuthya Whispering Wood?
              </h3>
              <p className="font-sans text-sm text-[#5E6B5D] max-w-xl mx-auto">
                Join our agricultural directors for a private on-site walkthrough this weekend in Honnasandra.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#263828] hover:bg-[#1A281B] active:scale-[0.98] text-white font-sans font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md cursor-pointer"
                >
                  <span>Book a Site Visit &rarr;</span>
                </button>
              </div>
            </div>

          </div>
        </Container>
      </section>

    </div>
  );
}
