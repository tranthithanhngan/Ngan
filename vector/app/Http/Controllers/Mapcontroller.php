<?php

namespace App\Http\Controllers;

use App\Models\map;
use Illuminate\Http\Request;
use DB;
class Mapcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('layout');
    }
    public function index1()
    {
        //
        return view('layoutraster');
    }

    public function tuyendtnd(){
        $tuyendtnd = DB::connection('pgsql')->select(
           " SELECT jsonb_build_object(
                'type',     'FeatureCollection',
                'features', jsonb_agg(features.feature)
            )
            FROM (
              SELECT jsonb_build_object(
                'type',       'Feature',
                'geometry',   ST_AsGeoJSON(ts)::jsonb,
                'properties', to_jsonb(inputs)  - 'geom'
              ) AS feature
              FROM (SELECT geom as ts, tua_de, vitrithuongluu,loaiquanli
                FROM tuyendtnd
                )inputs
                )features;"
              );
              return response()->json($tuyendtnd);

    }

    public function vuottuyen(){
        $vuottuyen = DB::connection('pgsql')->select(
           " SELECT jsonb_build_object(
                'type',     'FeatureCollection',
                'features', jsonb_agg(features.feature)
            )
            FROM (
              SELECT jsonb_build_object(
                'type',       'Feature',
                'geometry',   ST_AsGeoJSON(ts)::jsonb,
                'properties', to_jsonb(inputs)  - 'geom'
              ) AS feature
              FROM (SELECT geom as ts, tua_de,noidung,motabaohieu
                FROM vuottuyen
                )inputs
                )features;"
              );
              return response()->json($vuottuyen);

    }
    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function vuottuyenjson(Request $request){
      // dd($request->all());
      $lng = $request->lng;
      $lat= $request->lat;
        $vuottuyenjson = DB::connection('pgsql')->select(
           " SELECT jsonb_build_object(
                'type',     'FeatureCollection',
                'features', jsonb_agg(features.feature)
            )
            FROM (
              SELECT jsonb_build_object(
                'type',       'Feature',
                'geometry',   ST_AsGeoJSON(ts)::jsonb,
                'properties', to_jsonb(inputs)  - 'geom'
              ) AS feature
              FROM (select geom as ts,tua_de,ST_Distance(geom::geography, ST_GeomFromText('POINT($lat $lng)' ,4326)::geography)
            from vuottuyen
            
                )inputs
                )features;"
              );
              return response()->json($vuottuyenjson);

    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\map  $map
     * @return \Illuminate\Http\Response
     */
    public function show(map $map)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\map  $map
     * @return \Illuminate\Http\Response
     */
    public function edit(map $map)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\map  $map
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, map $map)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\map  $map
     * @return \Illuminate\Http\Response
     */
    public function destroy(map $map)
    {
        //
    }
}
