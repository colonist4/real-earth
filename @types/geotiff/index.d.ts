declare module 'geotiff' {

    interface readRastersOpts {
        interleave: boolean = false
    }

    class GeoTIFFImage {
        getBoundingBox(): Array
        getOrigin(): Array
        getWidth(): number
        getHeight(): number
        readRasters(opts?: readRastersOpts): Promise<Uint8Array|Uint16Array>
    }

    class GeoTIFF {
        constructor(): void;
        
        getImage(index?: number): Promise<GeoTIFFImage>
    }

    const geotiff: any;
    export const fromFile: (path: string)=>Promise<GeoTIFF>;
    export const fromUrl: (path: string)=>Promise<GeoTIFF>;
    export default geotiff;
}