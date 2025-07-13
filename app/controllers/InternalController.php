<?php

namespace App\Controllers;

use App\Models\Analytics;
use App\Models\Cart;
use App\Models\Store;
use App\Models\User;

class InternalController extends Controller
{
    public function index()
    {
        response()->inertia('internal', [
            'users' => User::count(),
            'stores' => Store::count(),
            'purchases' => Cart::where(function ($query) {
                $query->where('status', 'paid')
                    ->orWhere('status', 'completed');
            })->count(),
            'activeStores' => Store::whereHas('carts', function ($query) {
                $query->where(function ($query) {
                    $query->where('status', 'paid')
                        ->orWhere('status', 'completed');
                })
                    ->where('created_at', '>=', date('Y-m-d H:i:s', strtotime('-30 days')));
            })->count(),
            'activatedStores' => Store::where('status', 'live')->count(),
            'gmvThisMonth' => Cart::selectRaw('SUM(total::NUMERIC) as aggregate')
                ->where(function ($query) {
                    $query->where('status', 'paid')
                        ->orWhere('status', 'completed');
                })
                ->whereMonth('created_at', date('m'))
                ->whereYear('created_at', date('Y'))
                ->value('aggregate'),
            'gmvLastMonth' => Cart::selectRaw('SUM(total::NUMERIC) as aggregate')
                ->where(function ($query) {
                    $query->where('status', 'paid')
                        ->orWhere('status', 'completed');
                })
                ->whereMonth('created_at', date('m', strtotime('-1 month')))
                ->whereYear('created_at', date('Y', strtotime('-1 month')))
                ->value('aggregate'),
            'gmvThisYear' => Cart::selectRaw('SUM(total::NUMERIC) as aggregate')
                ->where(function ($query) {
                    $query->where('status', 'paid')
                        ->orWhere('status', 'completed');
                })
                ->whereYear('created_at', date('Y'))
                ->value('aggregate'),
            'gmvLastYear' => Cart::selectRaw('SUM(total::NUMERIC) as aggregate')
                ->where(function ($query) {
                    $query->where('status', 'paid')
                        ->orWhere('status', 'completed');
                })
                ->whereYear('created_at', date('Y', strtotime('-1 year')))
                ->value('aggregate'),
            'gmvAllTime' => Cart::selectRaw('SUM(total::NUMERIC) as aggregate')
                ->where(function ($query) {
                    $query->where('status', 'paid')
                        ->orWhere('status', 'completed');
                })
                ->value('aggregate'),
            'gmvThisWeek' => Cart::selectRaw('SUM(total::NUMERIC) as aggregate')
                ->where(function ($query) {
                    $query->where('status', 'paid')
                        ->orWhere('status', 'completed');
                })
                ->where('created_at', '>=', date('Y-m-d H:i:s', strtotime('monday this week')))
                ->value('aggregate'),
            'gmvLastWeek' => Cart::selectRaw('SUM(total::NUMERIC) as aggregate')
                ->where(function ($query) {
                    $query->where('status', 'paid')
                        ->orWhere('status', 'completed');
                })
                ->whereBetween('created_at', [
                    date('Y-m-d H:i:s', strtotime('monday last week')),
                    date('Y-m-d H:i:s', strtotime('sunday last week 23:59:59')),
                ])
                ->value('aggregate'),
            'activatedStoresThisWeek' => Store::where('status', 'live')
                ->where('created_at', '>=', date('Y-m-d H:i:s', strtotime('monday this week')))
                ->count(),
            'activatedStoresLastWeek' => Store::where('status', 'live')
                ->whereBetween('created_at', [
                    date('Y-m-d H:i:s', strtotime('monday last week')),
                    date('Y-m-d H:i:s', strtotime('sunday last week 23:59:59')),
                ])
                ->count(),
            'usersThisWeek' => User::where('created_at', '>=', date('Y-m-d H:i:s', strtotime('monday this week')))
                ->count(),
            'usersThisMonth' => User::whereMonth('created_at', date('m'))
                ->whereYear('created_at', date('Y'))
                ->count(),
            'activeStoresThisWeek' => Store::whereHas('carts', function ($query) {
                $query->where(function ($query) {
                    $query->where('status', 'paid')
                        ->orWhere('status', 'completed');
                })
                    ->where('created_at', '>=', date('Y-m-d H:i:s', strtotime('monday this week')));
            })
                ->count(),
            'purchasesThisWeek' => Cart::where(function ($query) {
                $query->where('status', 'paid')
                    ->orWhere('status', 'completed');
            })
                ->where('created_at', '>=', date('Y-m-d H:i:s', strtotime('monday this week')))
                ->count(),
            'purchasesThisMonth' => Cart::where(function ($query) {
                $query->where('status', 'paid')
                    ->orWhere('status', 'completed');
            })
                ->whereMonth('created_at', date('m'))
                ->whereYear('created_at', date('Y'))
                ->count(),
            'purchasesLastWeek' => Cart::where(function ($query) {
                $query->where('status', 'paid')
                    ->orWhere('status', 'completed');
            })
                ->whereBetween('created_at', [
                    date('Y-m-d H:i:s', strtotime('monday last week')),
                    date('Y-m-d H:i:s', strtotime('sunday last week 23:59:59')),
                ])
                ->count(),
            'storeViewsThisWeek' => Analytics::where('created_at', '>=', date('Y-m-d H:i:s', strtotime('monday this week')))
                ->where('event', 'page_view')
                ->where('page', 'home')
                ->distinct('user_ip')
                ->count('user_ip'),
            'storeViewsLastWeek' => Analytics::whereBetween('created_at', [
                date('Y-m-d H:i:s', strtotime('monday last week')),
                date('Y-m-d H:i:s', strtotime('sunday last week 23:59:59')),
            ])
                ->where('event', 'page_view')
                ->where('page', 'home')
                ->distinct('user_ip')
                ->count('user_ip'),
            'errors' => flash()->display('errors'),
            'success' => flash()->display('success'),
        ]);
    }
}
