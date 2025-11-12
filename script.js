// Proj4js を使用した座標変換（ブラウザ内処理・API不要）
import proj4 from 'https://cdn.jsdelivr.net/npm/proj4@2.9.1/+esm';

// よく使う座標系定義（EPSG.io から取得）
const epsgDefinitions = {
    'EPSG:6670': '+proj=tmerc +lat_0=36 +lon_0=132.166666666667 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6671': '+proj=tmerc +lat_0=36 +lon_0=133.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6672': '+proj=tmerc +lat_0=36 +lon_0=134.333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6673': '+proj=tmerc +lat_0=36 +lon_0=137.166666666667 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6674': '+proj=tmerc +lat_0=36 +lon_0=138.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6675': '+proj=tmerc +lat_0=36 +lon_0=139.833333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6676': '+proj=tmerc +lat_0=36 +lon_0=141.166666666667 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6677': '+proj=tmerc +lat_0=36 +lon_0=142.833333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6678': '+proj=tmerc +lat_0=36 +lon_0=144.166666666667 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6679': '+proj=tmerc +lat_0=36 +lon_0=145.833333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6680': '+proj=tmerc +lat_0=36 +lon_0=147.333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6681': '+proj=tmerc +lat_0=36 +lon_0=148.833333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6682': '+proj=tmerc +lat_0=36 +lon_0=150.333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6683': '+proj=tmerc +lat_0=36 +lon_0=151.833333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6684': '+proj=tmerc +lat_0=36 +lon_0=154.166666666667 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6685': '+proj=tmerc +lat_0=36 +lon_0=155.833333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6686': '+proj=tmerc +lat_0=36 +lon_0=157.333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6687': '+proj=tmerc +lat_0=36 +lon_0=158.833333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs',
    'EPSG:6688': '+proj=tmerc +lat_0=36 +lon_0=160.333333333333 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
};

// proj4 に定義を登録
Object.entries(epsgDefinitions).forEach(([code, def]) => {
    proj4.defs(code, def);
});

// 座標系の説明
const systemDescriptions = {
    'EPSG:4326': '全世界共通のGPS座標系です。緯度経度（度単位）で表現されます。',
    'EPSG:3857': 'Web地図で標準的に使用される投影座標系です。メートル単位で、Webサービス向けです。',
    'EPSG:6670': '日本の平面直角座標系（JGD2011 I系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6671': '日本の平面直角座標系（JGD2011 II系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6672': '日本の平面直角座標系（JGD2011 III系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6673': '日本の平面直角座標系（JGD2011 IV系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6674': '日本の平面直角座標系（JGD2011 V系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6675': '日本の平面直角座標系（JGD2011 VI系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6676': '日本の平面直角座標系（JGD2011 VII系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6677': '日本の平面直角座標系（JGD2011 VIII系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6678': '日本の平面直角座標系（JGD2011 IX系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6679': '日本の平面直角座標系（JGD2011 X系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6680': '日本の平面直角座標系（JGD2011 XI系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6681': '日本の平面直角座標系（JGD2011 XII系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6682': '日本の平面直角座標系（JGD2011 XIII系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6683': '日本の平面直角座標系（JGD2011 XIV系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6684': '日本の平面直角座標系（JGD2011 XV系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6685': '日本の平面直角座標系（JGD2011 XVI系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6686': '日本の平面直角座標系（JGD2011 XVII系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6687': '日本の平面直角座標系（JGD2011 XVIII系）です。最新のGPSデータム。メートル単位。',
    'EPSG:6688': '日本の平面直角座標系（JGD2011 XIX系）です。最新のGPSデータム。メートル単位。'
};

// DOM要素
const toSystemSelect = document.getElementById('toSystemSelect');
const fromSystemDisplay = document.getElementById('fromSystemDisplay');
const toSystemDescription = document.getElementById('toSystemDescription');
const swapButton = document.getElementById('swapButton');
const coordinatesInput = document.getElementById('coordinates');
const convertButton = document.getElementById('convertButton');
const resultsSection = document.getElementById('resultsSection');
const resultsContainer = document.getElementById('results');
const errorSection = document.getElementById('errorSection');
const errorMessage = document.getElementById('errorMessage');
const loadingIndicator = document.getElementById('loadingIndicator');

// ファイルアップロード関連
const fileInput = document.getElementById('fileInput');
const fileUploadArea = document.querySelector('.file-upload-area');
const fileInfo = document.getElementById('fileInfo');
const filePreview = document.getElementById('filePreview');

// 状態管理
let selectedFromSystem = null;
let selectedToSystem = null;
let uploadedFileData = null;

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    toSystemSelect.addEventListener('change', handleToSystemChange);

    swapButton.addEventListener('click', swapSystems);
    convertButton.addEventListener('click', performConversion);

    // ファイルアップロード
    fileInput.addEventListener('change', handleFileSelect);
    fileUploadArea.addEventListener('dragover', handleDragOver);
    fileUploadArea.addEventListener('dragleave', handleDragLeave);
    fileUploadArea.addEventListener('drop', handleFileDrop);

    // 初期状態を設定
    initializeDefaults();
});

// 初期状態を設定（座標系は未設定）
function initializeDefaults() {
    selectedFromSystem = null;
    selectedToSystem = null;
    fromSystemDisplay.textContent = '（ファイルアップロード後に自動検出）';
    fromSystemDisplay.style.color = '#999';
    toSystemSelect.value = '';
}

// 変換後の座標系が変更された
function handleToSystemChange(e) {
    const code = e.target.value;
    if (!code) {
        selectedToSystem = null;
        toSystemDescription.style.display = 'none';
        clearError();
        return;
    }

    // 選択されたオプションから名前を取得
    const option = toSystemSelect.options[toSystemSelect.selectedIndex];
    const name = option.text.split(' - ').slice(1).join(' - ') || option.text;

    selectedToSystem = { code, name };

    // 座標系の説明を表示
    const description = systemDescriptions[code];
    if (description) {
        toSystemDescription.textContent = description;
        toSystemDescription.style.display = 'block';
    } else {
        toSystemDescription.style.display = 'none';
    }

    clearError();
}


// 座標系をスワップ
function swapSystems() {
    if (!selectedFromSystem || !selectedToSystem) {
        showError('両方の座標系を選択してください');
        return;
    }

    // 変換前と変換後を入れ替え
    [selectedFromSystem, selectedToSystem] = [selectedToSystem, selectedFromSystem];

    // 表示を更新
    fromSystemDisplay.textContent = `${selectedFromSystem.code}: ${selectedFromSystem.name}`;
    toSystemSelect.value = selectedToSystem.code;
}

// ドラッグオーバーハンドラ
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    fileUploadArea.classList.add('drag-over');
}

// ドラッグリーブハンドラ
function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    fileUploadArea.classList.remove('drag-over');
}

// ドロップハンドラ
function handleFileDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    fileUploadArea.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        handleFileSelect({ target: { files } });
    }
}

// ファイル選択ハンドラ
async function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length === 0) return;

    const file = files[0];
    const fileName = file.name.toLowerCase();

    clearError();

    try {
        showLoading(true);

        if (fileName.endsWith('.geojson') || (fileName.endsWith('.json') && file.type === 'application/json')) {
            await handleGeoJSON(file);
        } else if (fileName.endsWith('.topojson')) {
            await handleTopoJSON(file);
        } else if (fileName.endsWith('.shp')) {
            showError('Shapeファイル対応は準備中です。GeoJSONまたはTopoJSONを使用してください');
        } else {
            showError('対応していないファイル形式です。GeoJSON、TopoJSONを使用してください');
        }
    } catch (error) {
        console.error('ファイル処理エラー:', error);
        showError(`ファイル処理エラー: ${error.message}`);
    } finally {
        showLoading(false);
    }
}

// GeoJSONハンドラ
async function handleGeoJSON(file) {
    const text = await file.text();
    const geojson = JSON.parse(text);

    const coordinates = extractCoordinatesFromGeoJSON(geojson);
    if (coordinates.length === 0) {
        throw new Error('GeoJSONから座標が見つかりません');
    }

    // 座標系情報を抽出
    const crsInfo = extractCRSFromGeoJSON(geojson);

    uploadedFileData = {
        type: 'geojson',
        data: geojson,
        coordinates: coordinates,
        fileName: file.name,
        crs: crsInfo
    };

    displayFileInfo(file.name, coordinates.length, 'GeoJSON', crsInfo);
    displayFilePreview(coordinates.slice(0, 10)); // 最初の10座標を表示

    // 座標系を自動設定
    if (crsInfo) {
        selectedFromSystem = { code: crsInfo.code, name: crsInfo.name };
        fromSystemDisplay.textContent = `${crsInfo.code}: ${crsInfo.name}`;
        fromSystemDisplay.style.color = '#000';
    } else {
        // 座標系が見つからない場合はデフォルト値を設定
        selectedFromSystem = { code: 'EPSG:4326', name: 'WGS 84' };
        fromSystemDisplay.textContent = 'EPSG:4326: WGS 84 （デフォルト・確認推奨）';
        fromSystemDisplay.style.color = '#f44336';
    }
}

// TopoJSONハンドラ
async function handleTopoJSON(file) {
    const text = await file.text();
    const topojson = JSON.parse(text);

    // TopoJSONをGeoJSONに変換（簡易版）
    const coordinates = extractCoordinatesFromTopoJSON(topojson);
    if (coordinates.length === 0) {
        throw new Error('TopoJSONから座標が見つかりません');
    }

    // 座標系情報を抽出
    const crsInfo = extractCRSFromTopoJSON(topojson);

    uploadedFileData = {
        type: 'topojson',
        data: topojson,
        coordinates: coordinates,
        fileName: file.name,
        crs: crsInfo
    };

    displayFileInfo(file.name, coordinates.length, 'TopoJSON', crsInfo);
    displayFilePreview(coordinates.slice(0, 10));

    // 座標系を自動設定
    if (crsInfo) {
        selectedFromSystem = { code: crsInfo.code, name: crsInfo.name };
        fromSystemDisplay.textContent = `${crsInfo.code}: ${crsInfo.name}`;
        fromSystemDisplay.style.color = '#000';
    } else {
        // 座標系が見つからない場合はデフォルト値を設定（TopoJSON は通常メタデータなし）
        selectedFromSystem = { code: 'EPSG:4326', name: 'WGS 84' };
        fromSystemDisplay.textContent = 'EPSG:4326: WGS 84 （デフォルト・確認推奨）';
        fromSystemDisplay.style.color = '#f44336';
    }
}

// GeoJSONから座標を抽出
function extractCoordinatesFromGeoJSON(geojson) {
    const coordinates = [];

    function extractFromGeometry(geometry) {
        if (!geometry) return;

        switch (geometry.type) {
            case 'Point':
                if (geometry.coordinates.length >= 2) {
                    coordinates.push({
                        x: geometry.coordinates[0],
                        y: geometry.coordinates[1]
                    });
                }
                break;
            case 'LineString':
            case 'MultiPoint':
                geometry.coordinates.forEach(coord => {
                    if (coord.length >= 2) {
                        coordinates.push({ x: coord[0], y: coord[1] });
                    }
                });
                break;
            case 'Polygon':
            case 'MultiLineString':
                geometry.coordinates.forEach(ring => {
                    ring.forEach(coord => {
                        if (coord.length >= 2) {
                            coordinates.push({ x: coord[0], y: coord[1] });
                        }
                    });
                });
                break;
            case 'MultiPolygon':
                geometry.coordinates.forEach(polygon => {
                    polygon.forEach(ring => {
                        ring.forEach(coord => {
                            if (coord.length >= 2) {
                                coordinates.push({ x: coord[0], y: coord[1] });
                            }
                        });
                    });
                });
                break;
        }
    }

    if (geojson.type === 'FeatureCollection') {
        geojson.features?.forEach(feature => {
            extractFromGeometry(feature.geometry);
        });
    } else if (geojson.type === 'Feature') {
        extractFromGeometry(geojson.geometry);
    } else if (geojson.type && ['Point', 'LineString', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon'].includes(geojson.type)) {
        extractFromGeometry(geojson);
    }

    return coordinates;
}

// TopoJSONから座標を抽出（簡易版）
function extractCoordinatesFromTopoJSON(topojson) {
    const coordinates = [];

    function processArcs(arcs) {
        arcs.forEach(arcIndices => {
            let x = 0, y = 0;
            const arcIndicesArray = Array.isArray(arcIndices[0]) ? arcIndices.flat() : arcIndices;

            arcIndicesArray.forEach(arcIdx => {
                const arc = topojson.arcs?.[Math.abs(arcIdx) - 1] || [];
                arc.forEach(delta => {
                    x += delta[0];
                    y += delta[1];
                    coordinates.push({ x, y });
                });
            });
        });
    }

    // TopoJSONのobjectsから座標を抽出（簡易版）
    if (topojson.objects) {
        Object.values(topojson.objects).forEach(obj => {
            if (obj.type === 'Point' && obj.coordinates) {
                coordinates.push({ x: obj.coordinates[0], y: obj.coordinates[1] });
            } else if (obj.geometries) {
                obj.geometries.forEach(geom => {
                    if (geom.type === 'Point' && geom.coordinates) {
                        coordinates.push({ x: geom.coordinates[0], y: geom.coordinates[1] });
                    } else if (geom.arcs) {
                        processArcs(geom.arcs);
                    }
                });
            }
        });
    }

    return coordinates;
}

// GeoJSONから座標系情報を抽出
function extractCRSFromGeoJSON(geojson) {
    // CRS プロパティから座標系情報を抽出
    if (geojson.crs && geojson.crs.properties && geojson.crs.properties.name) {
        const crsName = geojson.crs.properties.name;
        // EPSG:xxxx の形式を抽出
        const match = crsName.match(/EPSG[:\s](\d+)/i);
        if (match) {
            const code = `EPSG:${match[1]}`;
            return { code, name: crsName };
        }
        return { code: crsName, name: crsName };
    }

    // properties内のcrsを確認
    if (geojson.properties && geojson.properties.crs) {
        const crs = geojson.properties.crs;
        const match = String(crs).match(/EPSG[:\s](\d+)/i);
        if (match) {
            const code = `EPSG:${match[1]}`;
            return { code, name: String(crs) };
        }
    }

    return null;
}

// TopoJSONから座標系情報を抽出
function extractCRSFromTopoJSON(topojson) {
    // トランスフォーム情報から座標系を推測
    if (topojson.transform) {
        // TopoJSONのtransformは通常、投影座標を示唆
        // 多くの場合、Web Mercator (EPSG:3857) を想定
        return null;
    }

    // プロパティ内のCRS情報を確認
    if (topojson.properties && topojson.properties.crs) {
        const crs = topojson.properties.crs;
        const match = String(crs).match(/EPSG[:\s](\d+)/i);
        if (match) {
            const code = `EPSG:${match[1]}`;
            return { code, name: String(crs) };
        }
    }

    return null;
}

// ファイル情報を表示
function displayFileInfo(fileName, coordinateCount, format, crsInfo) {
    let html = `
        <div class="file-info-item">
            <span class="file-info-label">ファイル名:</span> ${fileName}
        </div>
        <div class="file-info-item">
            <span class="file-info-label">形式:</span> ${format}
        </div>
        <div class="file-info-item">
            <span class="file-info-label">座標数:</span> ${coordinateCount}
        </div>
    `;

    if (crsInfo) {
        html += `
        <div class="file-info-item">
            <span class="file-info-label">座標系:</span> ${crsInfo.code} (${crsInfo.name})
        </div>
        `;
    }

    fileInfo.innerHTML = html;
    fileInfo.style.display = 'block';
}

// ファイルプレビューを表示
function displayFilePreview(coordinates) {
    let html = '<strong>抽出座標サンプル（最初10個）:</strong><br>';
    coordinates.forEach((coord, i) => {
        html += `<div class="preview-item">${i + 1}. ${coord.x.toFixed(6)}, ${coord.y.toFixed(6)}</div>`;
    });
    filePreview.innerHTML = html;
    filePreview.style.display = 'block';
}

// 座標を変換
async function performConversion() {
    clearError();

    if (!selectedFromSystem || !selectedToSystem) {
        showError('両方の座標系を選択してください');
        return;
    }

    // ファイルアップロードから座標を取得
    if (!uploadedFileData) {
        showError('ファイルを選択してください');
        return;
    }

    const coordinates = uploadedFileData.coordinates;

    try {
        showLoading(true);
        const results = await transformCoordinates(coordinates);
        displayResults(coordinates, results);

        // ダウンロード機能を提供
        if (uploadedFileData && uploadedFileData.type === 'geojson') {
            provideDownloadOption(results, uploadedFileData);
        }
    } catch (error) {
        console.error('変換エラー:', error);
        showError(`変換エラー: ${error.message}`);
    } finally {
        showLoading(false);
    }
}

// 座標を変換（Proj4js を使用・ブラウザ内処理）
async function transformCoordinates(coordinates) {
    console.log('📍 座標変換開始:', {
        座標数: coordinates.length,
        変換元: selectedFromSystem.code,
        変換先: selectedToSystem.code
    });

    try {
        // Proj4js で座標変換
        const results = coordinates.map(coord => {
            // Proj4js の変換関数を呼び出す
            // 形式: proj4(source_crs, target_crs, [longitude, latitude])
            const [x, y] = proj4(
                selectedFromSystem.code,
                selectedToSystem.code,
                [coord.x, coord.y]
            );

            return { x, y, z: 0 };
        });

        console.log('✅ 座標変換完了:', {
            処理数: results.length,
            所要時間: '即座'
        });

        // MapTiler API と同じレスポンス形式で返す
        return {
            transformer_selection_strategy: 'local_proj4js',
            results: results
        };
    } catch (error) {
        console.error('❌ 座標変換エラー:', error);
        console.error('エラーメッセージ:', error.message);

        throw new Error(
            `座標変換に失敗しました: ${error.message}。\\n` +
            `確認: ${selectedFromSystem.code} → ${selectedToSystem.code} が正しいEPSGコードか確認してください。`
        );
    }
}

// 結果を表示（サマリーのみ）
function displayResults(originalCoordinates, apiResponse) {
    const transformed = apiResponse.results || [];

    // サマリーを表示（詳細はダウンロード時に含める）
    let html = `
        <div class="result-item">
            <div class="label">処理完了</div>
            <div class="value" style="font-size: 18px; font-weight: bold; color: #4CAF50;">
                ✅ ${transformed.length} 個の座標を変換しました
            </div>
        </div>
        <div class="result-item">
            <div class="label">変換元座標系</div>
            <div class="value">${selectedFromSystem.code}: ${selectedFromSystem.name}</div>
            <div class="label" style="margin-top: 8px;">変換先座標系</div>
            <div class="value">${selectedToSystem.code}: ${selectedToSystem.name}</div>
        </div>
        <div class="result-item">
            <div class="label">サンプル（最初の5個）</div>
            <div style="font-size: 12px; color: #666;">
    `;

    // 最初の5個のサンプルのみ表示
    const sampleSize = Math.min(5, originalCoordinates.length);
    for (let i = 0; i < sampleSize; i++) {
        const original = originalCoordinates[i];
        const result = transformed[i];
        if (result) {
            html += `
                ${i + 1}. (${original.x.toFixed(4)}, ${original.y.toFixed(4)})
                   → (${result.x.toFixed(1)}, ${result.y.toFixed(1)})<br>
            `;
        }
    }

    if (originalCoordinates.length > 5) {
        html += `<br><em>... 他 ${originalCoordinates.length - 5} 個</em>`;
    }

    html += `
            </div>
        </div>
        <div style="color: #999; font-size: 12px; margin-top: 15px;">
            ※ 詳細な変換結果はダウンロードしたGeoJSONファイルに含まれています
        </div>
    `;

    resultsContainer.innerHTML = html;
    resultsSection.style.display = 'block';
}

// ダウンロード選択肢を提供
function provideDownloadOption(results, fileData) {
    if (fileData.type !== 'geojson') return;

    const transformed = results.results || [];
    const updatedGeojson = JSON.parse(JSON.stringify(fileData.data));

    // GeoJSONの座標を更新
    let resultIndex = 0;
    function updateGeometry(geometry) {
        if (!geometry) return;

        switch (geometry.type) {
            case 'Point':
                if (resultIndex < transformed.length) {
                    const t = transformed[resultIndex++];
                    geometry.coordinates = [t.x, t.y];
                }
                break;
            case 'LineString':
            case 'MultiPoint':
                geometry.coordinates = geometry.coordinates.map(() => {
                    if (resultIndex < transformed.length) {
                        const t = transformed[resultIndex++];
                        return [t.x, t.y];
                    }
                    return [0, 0];
                });
                break;
            case 'Polygon':
            case 'MultiLineString':
                geometry.coordinates = geometry.coordinates.map(ring =>
                    ring.map(() => {
                        if (resultIndex < transformed.length) {
                            const t = transformed[resultIndex++];
                            return [t.x, t.y];
                        }
                        return [0, 0];
                    })
                );
                break;
            case 'MultiPolygon':
                geometry.coordinates = geometry.coordinates.map(polygon =>
                    polygon.map(ring =>
                        ring.map(() => {
                            if (resultIndex < transformed.length) {
                                const t = transformed[resultIndex++];
                                return [t.x, t.y];
                            }
                            return [0, 0];
                        })
                    )
                );
                break;
        }
    }

    if (updatedGeojson.type === 'FeatureCollection') {
        updatedGeojson.features?.forEach(feature => {
            updateGeometry(feature.geometry);
        });
    } else if (updatedGeojson.type === 'Feature') {
        updateGeometry(updatedGeojson.geometry);
    }

    // CRS メタデータを追加（互換性のため）
    updatedGeojson.crs = {
        type: 'name',
        properties: {
            name: selectedToSystem.code
        }
    };

    // 既存のダウンロードボタンがあれば削除
    const existingButton = resultsContainer.parentElement.querySelector('button.convert-button[data-download]');
    if (existingButton) {
        existingButton.remove();
    }

    // ダウンロードボタンを追加
    const downloadButton = document.createElement('button');
    downloadButton.className = 'convert-button';
    downloadButton.setAttribute('data-download', 'true');
    downloadButton.style.marginTop = '15px';
    downloadButton.textContent = '変換されたGeoJSONをダウンロード';
    downloadButton.onclick = () => {
        downloadGeoJSON(updatedGeojson, fileData.fileName);
    };

    resultsContainer.parentElement.appendChild(downloadButton);
}

// GeoJSONをダウンロード
function downloadGeoJSON(geojson, originalFileName) {
    const fileName = originalFileName.replace(/\.geojson$|\.json$/, '') + `_${selectedToSystem.code}.geojson`;
    const dataStr = JSON.stringify(geojson, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const link = document.createElement('a');
    link.href = dataUri;
    link.download = fileName;
    link.click();
}

// ローディング表示
function showLoading(show) {
    loadingIndicator.style.display = show ? 'block' : 'none';
    convertButton.disabled = show;
}

// エラー表示
function showError(message) {
    errorMessage.textContent = message;
    errorSection.style.display = 'block';
}

// エラーをクリア
function clearError() {
    errorSection.style.display = 'none';
    errorMessage.textContent = '';
}

