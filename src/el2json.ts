import * as GeoTIFF from 'geotiff'
import path from 'path'
import fs from 'fs'

const result = {
    width: 0,
    height: 0,
    data: null
}

GeoTIFF.fromFile(path.resolve(__dirname, '../resources/elevation.tif'))
.then((tiff) => tiff.getImage())
.then((image) => {
    result.width = image.getWidth()
    result.height = image.getHeight()
    return image.readRasters({ interleave: true })
})
.then((data) => {
    result.data = Array.from(data)
    return result
})
.then((result) => {
    fs.writeFileSync(path.resolve(__dirname, '../result/elv.json'), JSON.stringify(result))
})