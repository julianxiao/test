$(document).ready(function (){



    var oilprices = [[1367692400000, 61.05], [1367778800000, 58.32], [1367865200000, 57.35], [1367951600000, 56.31], [1368210800000, 55.55], [1368297200000, 55.64], [1368383600000, 54.02], [1368470000000, 51.88], [1368556400000, 52.99], [1368815600000, 52.99], [1368902000000, 51.21], [1368988400000, 52.24], [1369074800000, 50.48], [1369161200000, 51.99], [1369420400000, 51.13], [1369506800000, 55.04], [1369593200000, 55.37], [1369679600000, 54.23], [1369766000000, 55.42], [1370025200000, 54.01], [1370111600000, 56.97], [1370198000000, 58.14], [1370284400000, 58.14], [1370370800000, 59.02], [1370630000000, 58.74], [1370716400000, 58.88], [1370802800000, 57.71], [1370889200000, 59.71], [1370975600000, 59.89], [1371234800000, 57.81], [1371321200000, 59.06], [1371407600000, 58.00], [1371494000000, 57.99], [1371580400000, 59.39], [1371839600000, 59.39], [1371926000000, 58.07], [1372012400000, 60.07], [1372098800000, 61.14], [1372444400000, 61.39], [1372530800000, 61.46], [1372617200000, 61.79], [1372703600000, 62.00], [1372790000000, 60.07], [1373135600000, 60.69], [1373222000000, 61.82], [1373308400000, 60.05], [1373654000000, 58.91], [1373740400000, 57.93], [1373826800000, 58.16], [1373913200000, 57.55], [1373999600000, 57.11], [1374258800000, 56.59], [1374345200000, 59.61], [1374518000000, 61.69], [1374604400000, 62.28], [1374860000000, 62.91], [1374946400000, 62.93], [1375032800000, 64.03], [1375119200000, 66.03], [1375205600000, 65.87], [1375464800000, 64.64], [1375637600000, 64.38], [1375724000000, 64.28], [1375810400000, 64.28], [1376069600000, 61.51], [1376156000000, 61.89], [1376242400000, 62.01], [1376328800000, 63.85], [1376415200000, 63.63], [1376674400000, 63.61], [1376760800000, 63.10], [1376847200000, 63.13], [1376933600000, 61.83], [1377020000000, 63.38], [1377279200000, 64.58], [1377452000000, 65.84], [1377538400000, 65.06], [1377624800000, 66.46], [1377884000000, 64.40], [1378056800000, 63.68], [1378143200000, 63.19], [1378229600000, 61.93], [1378488800000, 61.47], [1378575200000, 61.55], [1378748000000, 61.81], [1378834400000, 62.37], [1379093600000, 62.46], [1379180000000, 63.17], [1379266400000, 62.55], [1379352800000, 64.94], [1379698400000, 66.27], [1379784800000, 65.50], [1379871200000, 65.77], [1379957600000, 64.18], [1380044000000, 65.20], [1380389600000, 63.15], [1380476000000, 63.49], [1380562400000, 65.08], [1380908000000, 66.30], [1380994400000, 65.96], [1381167200000, 66.93], [1381253600000, 65.98], [1381599200000, 65.35], [1381685600000, 66.26], [1381858400000, 68.00], [1382117600000, 69.09], [1382204000000, 69.10], [1382290400000, 68.19], [1382376800000, 68.19], [1382463200000, 69.14], [1382722400000, 68.19], [1382808800000, 67.77], [1382895200000, 68.97], [1382981600000, 69.57], [1383068000000, 70.68], [1383327200000, 71.09], [1383413600000, 70.92], [1383586400000, 71.81], [1383672800000, 72.81], [1383932000000, 72.19], [1384018400000, 72.56], [1384191200000, 72.50], [1384277600000, 74.15], [1384623200000, 75.05], [1384796000000, 75.92], [1384882400000, 75.57], [1385141600000, 74.89], [1385228000000, 73.56], [1385314400000, 75.57], [1385400800000, 74.95], [1385487200000, 76.83], [1385832800000, 78.21], [1385919200000, 76.53], [1386005600000, 76.86], [1386092000000, 76.00], [1386437600000, 71.59], [1386696800000, 71.47], [1386956000000, 71.62], [1387042400000, 71.00], [1387301600000, 71.98], [1387560800000, 71.12], [1387647200000, 69.47], [1387733600000, 69.26], [1387820000000, 69.83], [1387906400000, 71.09], [1388165600000, 71.73], [1388338400000, 73.36], [1388511200000, 74.04], [1388856800000, 76.30], [1389116000000, 77.49], [1389461600000, 78.23], [1389548000000, 79.91], [1389634400000, 80.09], [1389720800000, 79.10], [1389980000000, 80.57], [1390066400000, 81.93], [1390239200000, 83.32], [1390325600000, 81.62], [1390584800000, 80.95], [1390671200000, 79.53], [1390757600000, 80.30], [1390844000000, 82.88], [1390930400000, 81.66], [1391189600000, 80.24], [1391276000000, 80.05], [1391362400000, 79.94], [1391448800000, 81.44], [1391535200000, 81.22], [1391794400000, 79.02], [1391880800000, 80.26], [1391967200000, 80.30], [1392053600000, 83.08], [1392140000000, 83.69], [1392399200000, 86.13], [1392485600000, 87.61], [1392572000000, 87.40], [1392658400000, 89.47], [1392744800000, 88.60], [1393004000000, 87.56], [1393090400000, 87.56], [1393176800000, 87.10], [1393263200000, 91.86], [1393612400000, 93.53], [1393698800000, 94.53], [1393871600000, 95.93], [1394217200000, 93.98], [1394303600000, 96.37], [1394476400000, 95.46], [1394562800000, 96.32], [1395081200000, 93.43], [1395167600000, 95.10], [1395426800000, 94.64], [1395513200000, 95.10], [1396031600000, 97.70], [1396118000000, 94.42], [1396204400000, 90.62], [1396290800000, 91.01], [1396377200000, 88.71], [1396636400000, 88.32], [1396809200000, 90.23], [1396982000000, 88.28], [1397241200000, 87.86], [1397327600000, 90.02], [1397414000000, 92.25], [1397586800000, 90.63], [1397846000000, 90.63], [1397932400000, 90.49], [1398018800000, 91.24], [1398105200000, 91.06], [1398191600000, 90.49], [1398710000000, 96.62], [1398796400000, 96.00], [1399142000000, 99.62], [1399314800000, 99.18], [1399401200000, 95.09], [1399660400000, 96.33], [1399833200000, 95.67], [1400351600000, 91.90], [1400438000000, 90.84], [1400524400000, 90.13], [1400610800000, 90.57], [1400956400000, 89.21], [1401042800000, 86.99], [1401129200000, 89.85], [1401474800000, 90.99], [1401561200000, 91.64], [1401647600000, 92.33], [1401734000000, 91.75], [1402079600000, 90.02], [1402166000000, 88.41], [1402252400000, 87.14], [1402338800000, 88.11], [1402425200000, 91.77], [1402770800000, 92.78], [1402857200000, 93.27], [1402943600000, 95.46], [1403030000000, 95.46], [1403289200000, 101.74], [1403462000000, 98.81], [1403894000000, 100.88], [1404066800000, 99.64], [1404153200000, 102.59], [1404239600000, 101.84], [1404498800000, 99.52], [1404585200000, 99.52], [1404671600000, 104.52], [1404758000000, 105.47], [1404844400000, 105.15], [1405103600000, 108.75], [1405276400000, 109.92], [1405362800000, 110.33], [1405449200000, 110.21], [1405708400000, 105.68], [1405967600000, 101.84], [1406313200000, 100.86], [1406399600000, 101.22], [1406486000000, 105.90], [1406572400000, 107.58], [1406658800000, 105.62], [1406914400000, 101.58], [1407000800000, 100.98], [1407173600000, 103.83], [1407260000000, 106.23], [1407605600000, 108.50], [1407778400000, 110.11], [1407864800000, 110.14], [1408210400000, 113.79], [1408296800000, 114.93], [1408383200000, 114.86], [1408728800000, 117.48], [1408815200000, 118.30], [1408988000000, 116.06], [1409074400000, 118.52], [1409333600000, 118.75], [1409420000000, 113.46], [1409592800000, 112.52], [1410024800000, 121.84], [1410111200000, 123.53], [1410197600000, 123.69], [1410543200000, 124.23], [1410629600000, 125.80], [1410716000000, 126.29], [1411148000000, 127.05], [1411320800000, 129.07], [1411493600000, 132.19], [1411839200000, 128.85], [1412357600000, 127.76], [1412703200000, 138.54], [1412962400000, 136.80], [1413135200000, 136.38], [1413308000000, 134.86], [1413653600000, 134.01], [1413740000000, 136.68], [1413912800000, 135.65], [1414172000000, 134.62], [1414258400000, 134.62], [1414344800000, 134.62], [1414431200000, 139.64], [1414517600000, 140.21], [1414776800000, 140.00], [1414863200000, 140.97], [1414949600000, 143.57], [1415036000000, 145.29], [1415381600000, 141.37], [1415468000000, 136.04], [1415727200000, 146.40], [1415986400000, 145.18], [1416072800000, 138.74], [1416159200000, 134.60], [1416245600000, 129.29], [1416332000000, 130.65], [1416677600000, 127.95], [1416850400000, 127.95], [1417282400000, 122.19], [1417455200000, 124.08], [1417541600000, 125.10], [1417800800000, 121.41], [1417887200000, 119.17], [1417973600000, 118.58], [1418060000000, 120.02], [1418405600000, 114.45], [1418492000000, 113.01], [1418578400000, 116.00], [1418751200000, 113.77], [1419010400000, 112.87], [1419096800000, 114.53], [1419269600000, 114.98], [1419356000000, 114.98], [1419701600000, 116.27], [1419788000000, 118.15], [1419874400000, 115.59], [1419960800000, 115.46], [1420306400000, 109.71], [1420392800000, 109.35], [1420565600000, 106.23], [1420824800000, 106.34]];

    var exchangerates = [[1367606000000, 0.7580], [1367692400000, 0.7580], [1367778800000, 0.75470], [1367865200000, 0.75490], [1367951600000, 0.76130], [1368038000000, 0.76550], [1368124400000, 0.76930], [1368210800000, 0.76940], [1368297200000, 0.76880], [1368383600000, 0.76780], [1368470000000, 0.77080], [1368556400000, 0.77270], [1368642800000, 0.77490], [1368729200000, 0.77410], [1368815600000, 0.77410], [1368902000000, 0.77320], [1368988400000, 0.77270], [1369074800000, 0.77370], [1369161200000, 0.77240], [1369247600000, 0.77120], [1369334000000, 0.7720], [1369420400000, 0.77210], [1369506800000, 0.77170], [1369593200000, 0.77040], [1369679600000, 0.7690], [1369766000000, 0.77110], [1369852400000, 0.7740], [1369938800000, 0.77450], [1370025200000, 0.77450], [1370111600000, 0.7740], [1370198000000, 0.77160], [1370284400000, 0.77130], [1370370800000, 0.76780], [1370457200000, 0.76880], [1370543600000, 0.77180], [1370630000000, 0.77180], [1370716400000, 0.77280], [1370802800000, 0.77290], [1370889200000, 0.76980], [1370975600000, 0.76850], [1371062000000, 0.76810], [1371148400000, 0.7690], [1371234800000, 0.7690], [1371321200000, 0.76980], [1371407600000, 0.76990], [1371494000000, 0.76510], [1371580400000, 0.76130], [1371666800000, 0.76160], [1371753200000, 0.76140], [1371839600000, 0.76140], [1371926000000, 0.76070], [1372012400000, 0.76020], [1372098800000, 0.76110], [1372185200000, 0.76220], [1372271600000, 0.76150], [1372358000000, 0.75980], [1372444400000, 0.75980], [1372530800000, 0.75920], [1372617200000, 0.75730], [1372703600000, 0.75660], [1372790000000, 0.75670], [1372876400000, 0.75910], [1372962800000, 0.75820], [1373049200000, 0.75850], [1373135600000, 0.76130], [1373222000000, 0.76310], [1373308400000, 0.76150], [1373394800000, 0.760], [1373481200000, 0.76130], [1373567600000, 0.76270], [1373654000000, 0.76270], [1373740400000, 0.76080], [1373826800000, 0.75830], [1373913200000, 0.75750], [1373999600000, 0.75620], [1374086000000, 0.7520], [1374172400000, 0.75120], [1374258800000, 0.75120], [1374345200000, 0.75170], [1374431600000, 0.7520], [1374518000000, 0.75110], [1374604400000, 0.7480], [1374690800000, 0.75090], [1374777200000, 0.75310], [1374860000000, 0.75310], [1374946400000, 0.75270], [1375032800000, 0.74980], [1375119200000, 0.74930], [1375205600000, 0.75040], [1375292000000, 0.750], [1375378400000, 0.74910], [1375464800000, 0.74910], [1375551200000, 0.74850], [1375637600000, 0.74840], [1375724000000, 0.74920], [1375810400000, 0.74710], [1375896800000, 0.74590], [1375983200000, 0.74770], [1376069600000, 0.74770], [1376156000000, 0.74830], [1376242400000, 0.74580], [1376328800000, 0.74480], [1376415200000, 0.7430], [1376501600000, 0.73990], [1376588000000, 0.73950], [1376674400000, 0.73950], [1376760800000, 0.73780], [1376847200000, 0.73820], [1376933600000, 0.73620], [1377020000000, 0.73550], [1377106400000, 0.73480], [1377192800000, 0.73610], [1377279200000, 0.73610], [1377365600000, 0.73650], [1377452000000, 0.73620], [1377538400000, 0.73310], [1377624800000, 0.73390], [1377711200000, 0.73440], [1377797600000, 0.73270], [1377884000000, 0.73270], [1377970400000, 0.73360], [1378056800000, 0.73330], [1378143200000, 0.73590], [1378229600000, 0.73590], [1378316000000, 0.73720], [1378402400000, 0.7360], [1378488800000, 0.7360], [1378575200000, 0.7350], [1378661600000, 0.73650], [1378748000000, 0.73840], [1378834400000, 0.73950], [1378920800000, 0.74130], [1379007200000, 0.73970], [1379093600000, 0.73960], [1379180000000, 0.73850], [1379266400000, 0.73780], [1379352800000, 0.73660], [1379439200000, 0.740], [1379525600000, 0.74110], [1379612000000, 0.74060], [1379698400000, 0.74050], [1379784800000, 0.74140], [1379871200000, 0.74310], [1379957600000, 0.74310], [1380044000000, 0.74380], [1380130400000, 0.74430], [1380216800000, 0.74430], [1380303200000, 0.74430], [1380389600000, 0.74340], [1380476000000, 0.74290], [1380562400000, 0.74420], [1380648800000, 0.7440], [1380735200000, 0.74390], [1380821600000, 0.74370], [1380908000000, 0.74370], [1380994400000, 0.74290], [1381080800000, 0.74030], [1381167200000, 0.73990], [1381253600000, 0.74180], [1381340000000, 0.74680], [1381426400000, 0.7480], [1381512800000, 0.7480], [1381599200000, 0.7490], [1381685600000, 0.74940], [1381772000000, 0.75220], [1381858400000, 0.75150], [1381944800000, 0.75020], [1382031200000, 0.74720], [1382117600000, 0.74720], [1382204000000, 0.74620], [1382290400000, 0.74550], [1382376800000, 0.74490], [1382463200000, 0.74670], [1382549600000, 0.74580], [1382636000000, 0.74270], [1382722400000, 0.74270], [1382808800000, 0.7430], [1382895200000, 0.74290], [1382981600000, 0.7440], [1383068000000, 0.7430], [1383154400000, 0.74220], [1383240800000, 0.73880], [1383327200000, 0.73880], [1383413600000, 0.73690], [1383500000000, 0.73450], [1383586400000, 0.73450], [1383672800000, 0.73450], [1383759200000, 0.73520], [1383845600000, 0.73410], [1383932000000, 0.73410], [1384018400000, 0.7340], [1384104800000, 0.73240], [1384191200000, 0.72720], [1384277600000, 0.72640], [1384364000000, 0.72550], [1384450400000, 0.72580], [1384536800000, 0.72580], [1384623200000, 0.72560], [1384709600000, 0.72570], [1384796000000, 0.72470], [1384882400000, 0.72430], [1384968800000, 0.72440], [1385055200000, 0.72350], [1385141600000, 0.72350], [1385228000000, 0.72350], [1385314400000, 0.72350], [1385400800000, 0.72620], [1385487200000, 0.72880], [1385573600000, 0.73010], [1385660000000, 0.73370], [1385746400000, 0.73370], [1385832800000, 0.73240], [1385919200000, 0.72970], [1386005600000, 0.73170], [1386092000000, 0.73150], [1386178400000, 0.72880], [1386264800000, 0.72630], [1386351200000, 0.72630], [1386437600000, 0.72420], [1386524000000, 0.72530], [1386610400000, 0.72640], [1386696800000, 0.7270], [1386783200000, 0.73120], [1386869600000, 0.73050], [1386956000000, 0.73050], [1387042400000, 0.73180], [1387128800000, 0.73580], [1387215200000, 0.74090], [1387301600000, 0.74540], [1387388000000, 0.74370], [1387474400000, 0.74240], [1387560800000, 0.74240], [1387647200000, 0.74150], [1387733600000, 0.74190], [1387820000000, 0.74140], [1387906400000, 0.73770], [1387992800000, 0.73550], [1388079200000, 0.73150], [1388165600000, 0.73150], [1388252000000, 0.7320], [1388338400000, 0.73320], [1388424800000, 0.73460], [1388511200000, 0.73280], [1388597600000, 0.73230], [1388684000000, 0.7340], [1388770400000, 0.7340], [1388856800000, 0.73360], [1388943200000, 0.73510], [1389029600000, 0.73460], [1389116000000, 0.73210], [1389202400000, 0.72940], [1389288800000, 0.72660], [1389375200000, 0.72660], [1389461600000, 0.72540], [1389548000000, 0.72420], [1389634400000, 0.72130], [1389720800000, 0.71970], [1389807200000, 0.72090], [1389893600000, 0.7210], [1389980000000, 0.7210], [1390066400000, 0.7210], [1390152800000, 0.72090], [1390239200000, 0.71590], [1390325600000, 0.71330], [1390412000000, 0.71050], [1390498400000, 0.70990], [1390584800000, 0.70990], [1390671200000, 0.70930], [1390757600000, 0.70930], [1390844000000, 0.70760], [1390930400000, 0.7070], [1391016800000, 0.70490], [1391103200000, 0.70120], [1391189600000, 0.70110], [1391276000000, 0.70190], [1391362400000, 0.70460], [1391448800000, 0.70630], [1391535200000, 0.70890], [1391621600000, 0.70770], [1391708000000, 0.70770], [1391794400000, 0.70770], [1391880800000, 0.70910], [1391967200000, 0.71180], [1392053600000, 0.70790], [1392140000000, 0.70530], [1392226400000, 0.7050], [1392312800000, 0.70550], [1392399200000, 0.70550], [1392485600000, 0.70450], [1392572000000, 0.70510], [1392658400000, 0.70510], [1392744800000, 0.70170], [1392831200000, 0.70], [1392917600000, 0.69950], [1393004000000, 0.69940], [1393090400000, 0.70140], [1393176800000, 0.70360], [1393263200000, 0.70210], [1393349600000, 0.70020], [1393436000000, 0.69670], [1393522400000, 0.6950], [1393612400000, 0.6950], [1393698800000, 0.69390], [1393785200000, 0.6940], [1393871600000, 0.69220], [1393958000000, 0.69190], [1394044400000, 0.69140], [1394130800000, 0.68940], [1394217200000, 0.68910], [1394303600000, 0.69040], [1394390000000, 0.6890], [1394476400000, 0.68340], [1394562800000, 0.68230], [1394649200000, 0.68070], [1394735600000, 0.68150], [1394822000000, 0.68150], [1394908400000, 0.68470], [1394994800000, 0.68590], [1395081200000, 0.68220], [1395167600000, 0.68270], [1395254000000, 0.68370], [1395340400000, 0.68230], [1395426800000, 0.68220], [1395513200000, 0.68220], [1395599600000, 0.67920], [1395686000000, 0.67460], [1395772400000, 0.67350], [1395858800000, 0.67310], [1395945200000, 0.67420], [1396031600000, 0.67440], [1396118000000, 0.67390], [1396204400000, 0.67310], [1396290800000, 0.67610], [1396377200000, 0.67610], [1396463600000, 0.67850], [1396550000000, 0.68180], [1396636400000, 0.68360], [1396722800000, 0.68230], [1396809200000, 0.68050], [1396895600000, 0.67930], [1396982000000, 0.68490], [1397068400000, 0.68330], [1397154800000, 0.68250], [1397241200000, 0.68250], [1397327600000, 0.68160], [1397414000000, 0.67990], [1397500400000, 0.68130], [1397586800000, 0.68090], [1397673200000, 0.68680], [1397759600000, 0.69330], [1397846000000, 0.69330], [1397932400000, 0.69450], [1398018800000, 0.69440], [1398105200000, 0.69460], [1398191600000, 0.69640], [1398278000000, 0.69650], [1398364400000, 0.69560], [1398450800000, 0.69560], [1398537200000, 0.6950], [1398623600000, 0.69480], [1398710000000, 0.69280], [1398796400000, 0.68870], [1398882800000, 0.68240], [1398969200000, 0.67940], [1399055600000, 0.67940], [1399142000000, 0.68030], [1399228400000, 0.68550], [1399314800000, 0.68240], [1399401200000, 0.67910], [1399487600000, 0.67830], [1399574000000, 0.67850], [1399660400000, 0.67850], [1399746800000, 0.67970], [1399833200000, 0.680], [1399919600000, 0.68030], [1400006000000, 0.68050], [1400092400000, 0.6760], [1400178800000, 0.6770], [1400265200000, 0.6770], [1400351600000, 0.67360], [1400438000000, 0.67260], [1400524400000, 0.67640], [1400610800000, 0.68210], [1400697200000, 0.68310], [1400783600000, 0.68420], [1400870000000, 0.68420], [1400956400000, 0.68870], [1401042800000, 0.69030], [1401129200000, 0.68480], [1401215600000, 0.68240], [1401302000000, 0.67880], [1401388400000, 0.68140], [1401474800000, 0.68140], [1401561200000, 0.67970], [1401647600000, 0.67690], [1401734000000, 0.67650], [1401820400000, 0.67330], [1401906800000, 0.67290], [1401993200000, 0.67580], [1402079600000, 0.67580], [1402166000000, 0.6750], [1402252400000, 0.6780], [1402338800000, 0.68330], [1402425200000, 0.68560], [1402511600000, 0.69030], [1402598000000, 0.68960], [1402684400000, 0.68960], [1402770800000, 0.68820], [1402857200000, 0.68790], [1402943600000, 0.68620], [1403030000000, 0.68520], [1403116400000, 0.68230], [1403202800000, 0.68130], [1403289200000, 0.68130], [1403375600000, 0.68220], [1403462000000, 0.68020], [1403548400000, 0.68020], [1403634800000, 0.67840], [1403721200000, 0.67480], [1403807600000, 0.67470], [1403894000000, 0.67470], [1403980400000, 0.67480], [1404066800000, 0.67330], [1404153200000, 0.6650], [1404239600000, 0.66110], [1404326000000, 0.65830], [1404412400000, 0.6590], [1404498800000, 0.6590], [1404585200000, 0.65810], [1404671600000, 0.65780], [1404758000000, 0.65740], [1404844400000, 0.65320], [1404930800000, 0.65020], [1405017200000, 0.65140], [1405103600000, 0.65140], [1405190000000, 0.65070], [1405276400000, 0.6510], [1405362800000, 0.64890], [1405449200000, 0.64240], [1405535600000, 0.64060], [1405622000000, 0.63820], [1405708400000, 0.63820], [1405794800000, 0.63410], [1405881200000, 0.63440], [1405967600000, 0.63780], [1406054000000, 0.64390], [1406140400000, 0.64780], [1406226800000, 0.64810], [1406313200000, 0.64810], [1406399600000, 0.64940], [1406486000000, 0.64380], [1406572400000, 0.63770], [1406658800000, 0.63290], [1406745200000, 0.63360], [1406831600000, 0.63330], [1406914400000, 0.63330], [1407000800000, 0.6330], [1407087200000, 0.63710], [1407173600000, 0.64030], [1407260000000, 0.63960], [1407346400000, 0.63640], [1407432800000, 0.63560], [1407519200000, 0.63560], [1407605600000, 0.63680], [1407692000000, 0.63570], [1407778400000, 0.63540], [1407864800000, 0.6320], [1407951200000, 0.63320], [1408037600000, 0.63280], [1408124000000, 0.63310], [1408210400000, 0.63420], [1408296800000, 0.63210], [1408383200000, 0.63020], [1408469600000, 0.62780], [1408556000000, 0.63080], [1408642400000, 0.63240], [1408728800000, 0.63240], [1408815200000, 0.63070], [1408901600000, 0.62770], [1408988000000, 0.62690], [1409074400000, 0.63350], [1409160800000, 0.63920], [1409247200000, 0.640], [1409333600000, 0.64010], [1409420000000, 0.63960], [1409506400000, 0.64070], [1409592800000, 0.64230], [1409679200000, 0.64290], [1409765600000, 0.64720], [1409852000000, 0.64850], [1409938400000, 0.64860], [1410024800000, 0.64670], [1410111200000, 0.64440], [1410197600000, 0.64670], [1410284000000, 0.65090], [1410370400000, 0.64780], [1410456800000, 0.64610], [1410543200000, 0.64610], [1410629600000, 0.64680], [1410716000000, 0.64490], [1410802400000, 0.6470], [1410888800000, 0.64610], [1410975200000, 0.64520], [1411061600000, 0.64220], [1411148000000, 0.64220], [1411234400000, 0.64250], [1411320800000, 0.64140], [1411407200000, 0.63660], [1411493600000, 0.63460], [1411580000000, 0.6350], [1411666400000, 0.63460], [1411752800000, 0.63460], [1411839200000, 0.63430], [1411925600000, 0.63460], [1412012000000, 0.63790], [1412098400000, 0.64160], [1412184800000, 0.64420], [1412271200000, 0.64310], [1412357600000, 0.64310], [1412444000000, 0.64350], [1412530400000, 0.6440], [1412616800000, 0.64730], [1412703200000, 0.64690], [1412789600000, 0.63860], [1412876000000, 0.63560], [1412962400000, 0.6340], [1413048800000, 0.63460], [1413135200000, 0.6430], [1413221600000, 0.64520], [1413308000000, 0.64670], [1413394400000, 0.65060], [1413480800000, 0.65040], [1413567200000, 0.65030], [1413653600000, 0.64810], [1413740000000, 0.64510], [1413826400000, 0.6450], [1413912800000, 0.64410], [1413999200000, 0.64140], [1414085600000, 0.64090], [1414172000000, 0.64090], [1414258400000, 0.64280], [1414344800000, 0.64310], [1414431200000, 0.64180], [1414517600000, 0.63710], [1414604000000, 0.63490], [1414690400000, 0.63330], [1414776800000, 0.63340], [1414863200000, 0.63380], [1414949600000, 0.63420], [1415036000000, 0.6320], [1415122400000, 0.63180], [1415208800000, 0.6370], [1415295200000, 0.63680], [1415381600000, 0.63680], [1415468000000, 0.63830], [1415554400000, 0.63710], [1415640800000, 0.63710], [1415727200000, 0.63550], [1415813600000, 0.6320], [1415900000000, 0.62770], [1415986400000, 0.62760], [1416072800000, 0.62910], [1416159200000, 0.62740], [1416245600000, 0.62930], [1416332000000, 0.63110], [1416418400000, 0.6310], [1416504800000, 0.63120], [1416591200000, 0.63120], [1416677600000, 0.63040], [1416764000000, 0.62940], [1416850400000, 0.63480], [1416936800000, 0.63780], [1417023200000, 0.63680], [1417109600000, 0.63680], [1417196000000, 0.63680], [1417282400000, 0.6360], [1417368800000, 0.6370], [1417455200000, 0.64180], [1417541600000, 0.64110], [1417628000000, 0.64350], [1417714400000, 0.64270], [1417800800000, 0.64270], [1417887200000, 0.64190], [1417973600000, 0.64460], [1418060000000, 0.64680], [1418146400000, 0.64870], [1418232800000, 0.65940], [1418319200000, 0.66660], [1418405600000, 0.66660], [1418492000000, 0.66780], [1418578400000, 0.67120], [1418664800000, 0.67050], [1418751200000, 0.67180], [1418837600000, 0.67840], [1418924000000, 0.68110], [1419010400000, 0.68110], [1419096800000, 0.67940], [1419183200000, 0.68040], [1419269600000, 0.67810], [1419356000000, 0.67560], [1419442400000, 0.67350], [1419528800000, 0.67630], [1419615200000, 0.67620], [1419701600000, 0.67770], [1419788000000, 0.68150], [1419874400000, 0.68020], [1419960800000, 0.6780], [1420047200000, 0.67960], [1420133600000, 0.68170], [1420220000000, 0.68170], [1420306400000, 0.68320], [1420392800000, 0.68770], [1420479200000, 0.69120], [1420565600000, 0.69140], [1420652000000, 0.70090], [1420738400000, 0.70120], [1420824800000, 0.7010], [1420911200000, 0.70050]];

    function euroFormatter(v, axis) {
        return v.toFixed(axis.tickDecimals) + "kAmp";
    }

    function doPlot(position) {
        $.plot("#timechart", [
        {
            data: oilprices,
            label: "Voltage" 
        },
        {
            data: exchangerates,
            label: "Current",
            yaxis: 2 
        }
        ], {
            xaxes: [ {
                mode: "time" 
            }
            ],
            yaxes: [ {
                min: 0 
            }, {
                // align if we are to the right
                alignTicksWithAxis: position == "right" ? 1 : null,
                position: position,
                tickFormatter: euroFormatter
            }
            ],
            legend: {
                position: "sw" 
            }
        });
    }

    doPlot("right");


        Morris.Area({
        element: 'areachart',
        data: [{
            period: '2013 Q1',
            iphone: 2666,
            ipad: null,
            itouch: 2647
        }, {
            period: '2013 Q2',
            iphone: 2778,
            ipad: 2294,
            itouch: 2441
        }, {
            period: '2013 Q3',
            iphone: 4912,
            ipad: 1969,
            itouch: 2501
        }, {
            period: '2013 Q4',
            iphone: 3767,
            ipad: 3597,
            itouch: 5689
        }, {
            period: '2014 Q1',
            iphone: 6810,
            ipad: 1914,
            itouch: 2293
        }, {
            period: '2014 Q2',
            iphone: 5670,
            ipad: 4293,
            itouch: 1881
        }, {
            period: '2014 Q3',
            iphone: 4820,
            ipad: 3795,
            itouch: 1588
        }, {
            period: '2014 Q4',
            iphone: 15073,
            ipad: 5967,
            itouch: 5175
        }, {
            period: '2015 Q1',
            iphone: 10687,
            ipad: 4460,
            itouch: 2028
        }, {
            period: '2015 Q2',
            iphone: 8432,
            ipad: 5713,
            itouch: 1791
        }],
        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['variable1', 'variable2', 'variable3'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });


});