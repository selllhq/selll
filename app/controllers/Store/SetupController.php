<?php

namespace App\Controllers\Store;

use App\Models\Store;
use App\Models\User;

class SetupController extends Controller
{
    public function index()
    {
        response()->inertia('store/setup', [
            'errors' => flash()->display('errors') ?? [],
        ]);
    }

    public function store()
    {
        $data = request()->validate([
            'name' => 'string',
            'identifier' => 'string',
            'description' => 'min:10',
        ]);

        if (!$data) {
            return response()
                ->withFlash('errors', request()->errors())
                ->redirect('/store/new', 303);
        }

        if (Store::where('identifier', $data['identifier'])->exists()) {
            return response()
                ->withFlash('errors', ['identifier' => "{$data['identifier']}.selll.store is already taken, please choose another one"])
                ->redirect('/store/new', 303);
        }

        $user = User::find(auth()->id());
        $user->switchStore($user->ownedStores()->create($data));

        return response()->redirect('/dashboard');
    }
}
